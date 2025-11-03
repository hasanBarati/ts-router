import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { FilterCustomizationState } from "./type";

export const useFilterCustomizationStore = create<FilterCustomizationState>()(
  devtools(
    (set, get) => ({
      tables: {},
      initializeFromApi: (tableKey, apiData, defaultFields, defaultColumns) => {
        try {
          if (!apiData) {
            set((state) => ({
              tables: {
                ...state.tables,
                [tableKey]: {
                  fields: defaultFields,
                  columns: defaultColumns,
                },
              },
            }));
            return;
          }
          const tableData = JSON.parse(apiData);
          if (!tableData) {
      
            set((state) => ({
              tables: {
                ...state.tables,
                [tableKey]: {
                  fields: defaultFields,
                  columns: defaultColumns,
                },
              },
            }));
            return;
          }
          const { grid = [], statusbar = [] } = tableData;
          const mergedFields = defaultFields.map((field) => {
            const statusEntry = statusbar.find((s: string) =>
              s.startsWith(field.id)
            );
            if (statusEntry) {
              const [_, location] = statusEntry.split(":");
              return {
                ...field,
                isInAdvanced: location === "advanced",
                order: statusbar.indexOf(statusEntry),
              };
            }
            return field;
          });

          // ✅ اصلاح: Merge ستون‌ها - همه defaultColumns رو نگه دار
          const mergedColumns = defaultColumns.map((col, index) => {
            const gridIndex = grid.indexOf(col.id);
            
            if (gridIndex !== -1) {
              // ✅ در grid هست
              return {
                ...col,
                order: gridIndex,
                isVisible: true,
              };
            } else {
              return {
                ...col,
                isVisible: false,
                order: index, 
              };
            }
          });

          set((state) => ({
            tables: {
              ...state.tables,
              [tableKey]: {
                fields: mergedFields,
                columns: mergedColumns,
              },
            },
          }));
        } catch (error) {
   
          set((state) => ({
            tables: {
              ...state.tables,
              [tableKey]: {
                fields: defaultFields,
                columns: defaultColumns,
              },
            },
          }));
        }
      },

      updateFieldOrder: (tableKey, fields) => {
   
        set((state) => ({
          tables: {
            ...state.tables,
            [tableKey]: {
              ...state.tables[tableKey],
              fields,
            },
          },
        }));
      },

      toggleFieldLocation: (tableKey, fieldId) => {
        set((state) => {
          const table = state.tables[tableKey];
          if (!table) return state;

          const updatedFields = table.fields.map((f) =>
            f.id === fieldId ? { ...f, isInAdvanced: !f.isInAdvanced } : f
          );

          return {
            tables: {
              ...state.tables,
              [tableKey]: {
                ...table,
                fields: updatedFields,
              },
            },
          };
        });
      },

      getTableFields: (tableKey) => {
        const result = get().tables[tableKey]?.fields || [];
        return result;
      },

      updateColumnOrder: (tableKey, columns) => {

        set((state) => ({
          tables: {
            ...state.tables,
            [tableKey]: {
              ...state.tables[tableKey],
              columns,
            },
          },
        }));
      },

      toggleColumnVisibility: (tableKey, columnId) => {
        set((state) => {
          const table = state.tables[tableKey];
          if (!table) return state;

          const updatedColumns = table.columns.map((c) =>
            c.id === columnId ? { ...c, isVisible: !c.isVisible } : c
          );

          return {
            tables: {
              ...state.tables,
              [tableKey]: {
                ...table,
                columns: updatedColumns,
              },
            },
          };
        });
      },

      getTableColumns: (tableKey) => {
        const result = get().tables[tableKey]?.columns || [];
        return result;
      },

      resetTableToDefault: (tableKey, defaultFields, defaultColumns) => {

        set((state) => ({
          tables: {
            ...state.tables,
            [tableKey]: {
              fields: defaultFields,
              columns: defaultColumns,
            },
          },
        }));
      },
    }),
    { name: "FilterCustomizationStore" }
  )
);
