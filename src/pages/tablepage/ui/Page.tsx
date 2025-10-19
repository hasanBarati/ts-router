import { FilterChips } from "@/features/chip";
import { DataTable } from "@/features/data-table";
import { DeleteConfirmation } from "@/features/delete-confirmation";
import type {
  TableColumn
} from "@/features/filter-customization/model/type";
import { useFilterCustomizationStore } from "@/features/filter-customization/model/use-filter-customization-store"; // ✅ اضافه شد
import React, { useMemo, useState } from "react"; // ✅ اضافه شد useMemo
import { FormProvider, useForm } from "react-hook-form";
import type { Bag, BagFilters } from "../model/types";
import { useOrderFilter } from "../model/usegetTableData";
import { createColumns } from "./coulmns";
import { FilterTable } from "./filter";
import { FormAction } from "./form-action";
import { useDeleteBag } from "./form-action/lib/use-form-mutation";
import { TableActions } from "./table-actions";
import { useVisibleColumns } from "../model/use-visible-columns";

// ✅ تعریف ستون‌های پیش‌فرض (از filter.tsx منتقل شد)

const defaultColumns: TableColumn[] =createColumns()
//  [
//   { id: "select", label: "انتخاب", isVisible: true, order: 0 },
//   { id: "bagNumber", label: "شماره کیسه", isVisible: true, order: 1 },
//   { id: "selectSourceHub", label: "هاب مبدا", isVisible: true, order: 2 },
//   { id: "selectDestinationHub", label: "هاب مقصد", isVisible: true, order: 3 },
//   { id: "status", label: "وضعیت", isVisible: true, order: 4 },
//   { id: "selectCurrentHub", label: "هاب فعلی", isVisible: true, order: 5 },
//   { id: "weightCapacity", label: "ظرفیت وزن", isVisible: true, order: 6 },
//   { id: "volumeCapacity", label: "ظرفیت حجم", isVisible: true, order: 7 },
//   { id: "allocatedWeight", label: "وزن تخصیص یافته", isVisible: true, order: 8 },
//   { id: "allocatedVolume", label: "حجم تخصیص یافته", isVisible: true, order: 9 },
//   { id: "isActive", label: "فعال", isVisible: true, order: 10 },
//   { id: "actions", label: "عملیات", isVisible: true, order: 11 },
// ];

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
  // const handleCreateClick = () => {
  //   setFormState({ isOpen: true, editData: null });
  // };
  // const handleExport = () => {
  //   console.log("Export data");
  // };

  // const handleImport = () => {
  //   console.log("Import data");
  // };

  // const handleBulkDelete = () => {
  //   console.log("Bulk delete");
  // };

  // const handleCreateNormal = () => {
  //   setFormState({ isOpen: true, editData: null });
  // };

  // const handleCreateSpecial = () => {
  //   setFormState({ isOpen: true, editData: null });
  // };

  // ✅ ساخت ستون‌های اصلی جدول
  const allColumns = useMemo(() => 
    createColumns({
      onEdit: handleEditClick,
      onDelete: setDeleteId,
    }), 
    []
  );

  const visibleColumns = useVisibleColumns(
    customizedColumns,
    defaultColumns,
    allColumns
  );
  
 console.log(createColumns())
  const handleActiveChange = (value: boolean) => {
    methods.setValue("isActive", value);
    const currentValues = methods.getValues();
    setAppliedFilters({ ...currentValues, isActive: value });
  };

 

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

      <TableActions
        // onCreateNormal={handleCreateNormal}
        // onCreateSpecial={handleCreateSpecial}
        // onExport={handleExport}
        // onImport={handleImport}
        // onBulkDelete={handleBulkDelete}
        onActiveChange={handleActiveChange}
        isActive={appliedFilters.isActive!}
      />

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
