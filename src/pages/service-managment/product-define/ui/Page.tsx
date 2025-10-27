import { FilterChips } from "@/features/chip";
import { DataTable } from "@/features/data-table";
import { DeleteConfirmation } from "@/features/delete-confirmation";
import type { TableColumn } from "@/features/filter-customization/model/type";
import { exportToExcel } from "@/shared/lib/export-excel";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDeleteProduct } from "../lib/hooks/use-form-mutation";
import { useProductFilter } from "../lib/hooks/use-get-tableData";
import { createColumns } from "../model/table/table-columns-config";
import type { Product, ProductDefineFilters } from "../model/table/table-types";
import { FormAction } from "./form/product-form-dialog";
import { ProductActions } from "./table/table-actions";
import { FilterTable } from "./table/table-filters";

const defaultColumns: TableColumn[] = createColumns();

export const ProductDefine: React.FC = () => {
  const [tableData, setTableData] = useState<Product[]>([]);
  const [formState, setFormState] = useState<{
    isOpen: boolean;
    editData: Product | null;
  }>({
    isOpen: false,
    editData: null,
  });

  const [deleteId, setDeleteId] = useState<number | null>(null);
  const deleteMutation = useDeleteProduct();
  const methods = useForm<ProductDefineFilters>({
    defaultValues: {
      isActive: true,
    },
  });

  const [appliedFilters, setAppliedFilters] = useState<ProductDefineFilters>(
    methods.getValues()
  );

  const onSubmit = (data: ProductDefineFilters) => {
    setAppliedFilters(data);
  };

  const handleCreateNormal = () => {
    setFormState({ isOpen: true, editData: null });
  };

  const handleEditClick = (bag: Product) => {
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

  const handleActiveChange = (value: boolean) => {
    methods.setValue("isActive", value);
    const currentValues = methods.getValues();
    setAppliedFilters({ ...currentValues, isActive: value });
  };

  const handleTableDataChange = (data: Product[]) => {
    setTableData(data);
  };

const allColumns = createColumns({
  onEdit: handleEditClick,
  onDelete: setDeleteId,
});
  const handleExportExcel = async () => {
    await exportToExcel(allColumns, tableData, {
      title: "لیست محصولات",
      fileName: "products",
    });
  };

  return (
    <div className="space-y-6">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <FilterTable defaultColumns={defaultColumns} onSubmit={onSubmit} />
          <FilterChips appliedFilters={appliedFilters} onApply={onSubmit} />
        </form>
      </FormProvider>

      <ProductActions
        onCreateNormal={handleCreateNormal}
        onExportExcel={handleExportExcel}
        isActive={appliedFilters.isActive!}
        onActiveChange={handleActiveChange}
        tableData={tableData}
      />

      <DataTable<Product, ProductDefineFilters>
        columns={allColumns}
        filters={appliedFilters}
        fetchQuery={useProductFilter}
        initialPageSize={10}
        enableRowSelection={true}
        onRowSelectionChange={(selected) => {
          console.log("سطرهای انتخاب شده:", selected);
        }}
        onDataChange={handleTableDataChange}
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
          title="آیا از حذف این محصول اطمینان دارید؟"
          itemName={`محصول شماره ${deleteId}`}
          isDeleting={deleteMutation.isPending}
        />
      )}
    </div>
  );
};
