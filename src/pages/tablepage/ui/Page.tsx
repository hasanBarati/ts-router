import { FilterChips } from "@/features/chip";
import { DataTable } from "@/features/data-table/ui/data-table";
import { DeleteConfirmation } from "@/features/delete-confirmation";
import type { TableColumn } from "@/features/filter-customization/model/type";
import { useFilterCustomizationStore } from "@/features/filter-customization/model/use-filter-customization-store"; // ✅ اضافه شد
import { useVisibleColumns } from "@/shared/hooks/use-visible-columns";
import React, { useState } from "react"; // ✅ اضافه شد useMemo
import { FormProvider, useForm } from "react-hook-form";
import type { Bag, BagFilters } from "../model/types";
import { useOrderFilter } from "../model/usegetTableData";
import { createColumns } from "./coulmns";
import { FilterTable } from "./filter";
import { FormAction } from "./form-action";
import { useDeleteBag } from "./form-action/lib/use-form-mutation";

const defaultColumns = createColumns() as TableColumn[];

export const TablePage: React.FC = () => {
  const [formState, setFormState] = useState<{
    isOpen: boolean;
    editData: Bag | null;
  }>({
    isOpen: false,
    editData: null,
  });

  const [deleteId, setDeleteId] = useState<number | null>(null);
  const deleteMutation = useDeleteBag();

  // ✅ دریافت ستون‌های شخصی‌سازی شده از Store
  const { getTableColumns } = useFilterCustomizationStore();

  const customizedColumns = getTableColumns("bag-table");

  const methods = useForm<BagFilters>({
    defaultValues: {
      selectsourceHub: null,
      selectdestinationHub: null,
      isActive: true,
      bagNumber: null,
    },
  });

  const [appliedFilters, setAppliedFilters] = useState<BagFilters>(
    methods.getValues()
  );

  const onSubmit = (data: BagFilters) => {
    setAppliedFilters(data);
  };

  const handleEditClick = (bag: Bag) => {
    setFormState({ isOpen: true, editData: bag });
  };

  const handleFormClose = () => {
    setFormState({ isOpen: false, editData: null });
  };

  const handleDeleteConfirm = () => {
    if (deleteId) {
      deleteMutation.mutate(deleteId, {
        onSuccess: () => setDeleteId(null),
      });
    }
  };

  const allColumns = createColumns({
    onEdit: handleEditClick,
    onDelete: setDeleteId,
  });

  const visibleColumns = useVisibleColumns(
    customizedColumns,
    defaultColumns,
    allColumns
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">مدیریت کیسه‌ها</h1>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <FilterTable defaultColumns={defaultColumns} onSubmit={onSubmit} />
          <FilterChips appliedFilters={appliedFilters} onApply={onSubmit} />
        </form>
      </FormProvider>

      {/* <TableActions
        onCreateNormal={handleCreateNormal}
        // onCreateSpecial={handleCreateSpecial}
        // onExport={handleExport}
        // onImport={handleImport}
        // onBulkDelete={handleBulkDelete}
        onActiveChange={handleActiveChange}
        isActive={appliedFilters.isActive!}
      /> */}

      <DataTable<Bag, BagFilters>
        columns={visibleColumns as any}
        filters={appliedFilters}
        fetchQuery={useOrderFilter}
        initialPageSize={10}
        enableRowSelection={true}
        onRowSelectionChange={(selected) => {
          console.log("سطرهای انتخاب شده:", selected);
        }}
      />

      <FormAction
        initialData={formState.editData}
        isOpen={formState.isOpen}
        onClose={handleFormClose}
      />

      {deleteId && (
        <DeleteConfirmation
          isOpen={true}
          onClose={() => setDeleteId(null)}
          onConfirm={handleDeleteConfirm}
          title="آیا از حذف این کیسه اطمینان دارید؟"
          itemName={`کیسه شماره ${deleteId}`}
          isDeleting={deleteMutation.isPending}
        />
      )}
    </div>
  );
};
