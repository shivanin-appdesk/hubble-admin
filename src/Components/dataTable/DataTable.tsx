import {
  DataGrid,
  GridColDef,
  GridToolbar,
   GridToolbarProps,
  DataGridProps
} from "@mui/x-data-grid";
import "./dataTable.scss";
import { Link, Routes,Route,Navigate } from "react-router-dom";
import CardComponent from "../../Pages/Cards/Card"; 

import type { UserData } from "../../Pages/Users/Users";


type Props<T> = {
  columns: GridColDef[]; 
  rows: T[];
  slug: string;
};


const DataTable = <T extends Record<string, any>>(props: Props<T>) => {

  
  // TEST THE API

  // const queryClient = useQueryClient();
  // // const mutation = useMutation({
  // //   mutationFn: (id: number) => {
  // //     return fetch(`http://localhost:8800/api/${props.slug}/${id}`, {
  // //       method: "delete",
  // //     });
  // //   },
  // //   onSuccess: ()=>{
  // //     queryClient.invalidateQueries([`all${props.slug}`]);
  // //   }
  // // });

  const handleDelete = (id: number) => {
    //delete the item
    // mutation.mutate(id)
  };

const RenderCard: React.FC<{ rows: any[] }> = ({ rows }) => {
  const renderFunction = ({ match }: { match: any }) => {
    const clickedId = match?.params?.id;
    const clickedRowData = rows.find((row) => row.id.toString() === clickedId);

    return clickedId ? (
      <CardComponent id={clickedId || ""} data={clickedRowData || {}} />
    ) : (
      <Navigate to={`/${props.slug}`} replace={true} />
    );
  };

  return (
    <Route path={`/${props.slug}/:id/card`} element={<>{renderFunction}</>} />
  );
};



  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="action">
          <Link to={`/${props.slug}/${params.row.id}/card`}>
            <img src="/view.svg" alt="" />
          </Link>
          <div className="delete" onClick={() => handleDelete(params.row.id)}>
            <img src="/delete.svg" alt="" />
          </div>
        </div>
      );
    },
  };

  return (
    <div className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={props.rows}
        columns={[...props.columns, actionColumn]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[10]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
      />
      <Routes>
        <Route
          path={`/${props.slug}/:id/card`}
          element={<RenderCard rows={props.rows} />}
        />
      </Routes>
    </div>
  );
};

export default DataTable;