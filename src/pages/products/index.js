import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux"
import DeleteCommonAction from "../../components/Common/Actions/DeleteAction";
import EditCommonAction from "../../components/Common/Actions/EditAction";
import DeleteModal from "../../components/Common/Modals/DeleteModal";
import Table from '../../components/Table'
import { addProduct, deleteMulProduct, deleteProduct, getAllProducts, updateProduct } from "../../redux/action/productActions";
import ProductForm from "./productForm";

const Products = () => {

  const { products } = useSelector((state) => state.all);
  const [open, setOpen] = React.useState()
  const [actionData, setActionData] = React.useState();
  const dispatch = useDispatch()

  const tabelHeaders = [
    {
      id: 'productName',
      label: 'Name',
    },
    {
      id: 'category',
      label: 'Categories',
    },
    {
      id: 'description',
      label: 'Description',
    },
    {
      id: 'costPrice',
      label: 'Cost Price',
    },
    {
      id: 'sellPrice',
      label: 'Sell Price',
    },
    {
      id: 'discountSellPrice',
      label: 'Discounted Sell Price',
    },

    {
      id: 'finalPrice',
      label: 'Final Price',
    },
  ];


  const handleEdit = (data) => {
    toggleAdd("Edit");
    setActionData(data);
  };

  const handleDelete = (data) => {
    toggleAdd("Delete");
    setActionData(data);
  };

  const EditAction = (action) => (
    <EditCommonAction
      onClick={() => handleEdit(action.data)}
    />
  );

  const handleAllDelete = (value) => {
    toggleAdd("DeleteMul");
    setActionData(value);
  }

  const DeleteAction = (action) => (
    <DeleteCommonAction
      onClick={() => handleDelete(action.data)}
    />
  );


  const rowActions = [
    ...[EditAction],
    ...[DeleteAction]

  ];

  const toggleAdd = (mode) => {
    console.log('mode', mode);
    setOpen(mode);
    if (mode === undefined) {
      setActionData({});
    }
  };


  const onSubmit = (data) => {
    if (open === "Add") {
      dispatch(
        addProduct({
          ...actionData,
          id: Math.random(),
          ...data,
        })
      )
      toggleAdd();

    }
    else if (open === "Edit") {
      dispatch(
        updateProduct({
          ...actionData,
          ...data,
        })
      )
      toggleAdd();

    }
  };


  const confirmDelete = (data) => {
    if (open === "Delete") {
      dispatch(deleteProduct(actionData))

    } else if (open === "DeleteMul") {
      dispatch(deleteMulProduct(actionData))
    }
    toggleAdd();
  };

  return (
    <>
      <DeleteModal
        size="md"
        open={open === "Delete" || open === "DeleteMul"}
        title={actionData?.productName}
        onClose={() => toggleAdd()}
        onSubmit={() => confirmDelete()}
      />
      <ProductForm data={actionData} open={open === "Add" || open === "Edit"} title={open} onClose={() => toggleAdd()} onSubmit={(e) => onSubmit(e)} />
      <div style={{ padding: 20 }}>
        <Stack flexDirection="row" justifyContent="space-between" alignItems="center" style={{ marginBottom: 20 }}>
          <Typography variant="h5">Products</Typography>
          <Button variant="contained" onClick={() => toggleAdd("Add")}>Add</Button>
        </Stack>
        <Table rows={products} title="Product list" onDelete={(e) => handleAllDelete(e)} actions={rowActions} tableHeaders={tabelHeaders} />
      </div>
    </>
  );
};

export default Products;
