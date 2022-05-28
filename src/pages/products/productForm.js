import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Box, Button, Dialog, DialogContent, DialogTitle, Grid, IconButton, TextField, Typography, MenuItem } from "@mui/material";
import CloseIcon from "@mui/icons-material/CloseOutlined"
import { useSelector } from "react-redux";

const ProductForm = ({ open, title, onClose, defaultValues, data, onSubmit }) => {
    const methods = useForm({
        defaultValues: defaultValues,
    });
    const [values, setValues] = React.useState({})
    const {
        register,
        handleSubmit,
        watch,
        errors,
        control,
        formState = { errors },
        reset,
        setValue,
        getValues,
    } = methods;

    const [formErrors, setFormErrors] = React.useState({});
    React.useEffect(() => {
        setFormErrors(formState.errors);
    }, [formState]);

    const handleClose = () => {
        onClose();
        setFormErrors({});
        setValues({})
        reset();
    }
    const localSubmit = (value) => {
        onSubmit({ ...data, ...value, ...values })
    };
    const categories = useSelector(state => state.all.categories)

    const calculateDiscount = (costprice, sellprice) => {
        const costPrice = parseInt(costprice);
        const sellPrice = parseInt(sellprice);

        const discount = ((costPrice - sellPrice) / costPrice) * 100;


        const disPrice = (sellPrice * discount) / 100
        const finalPrice = sellPrice - disPrice


        console.log('disPrice', finalPrice);

        return { discount: discount, disPrice: disPrice, finalVal: finalPrice }
        // setValues({
        //     ...values,
        //     discountSellPrice: disPrice
        // })
    }
    const handleChange = (e) => {
        // console.log('handleChange', e.target.name, e.target.value);
        let discountSellPrice = 0
        let discountVal = 0
        let finalPrice = 0
        if (e.target.name === 'sellPrice') {
            const { disPrice, discount, finalVal } = calculateDiscount(values.costPrice, e.target.value)
            discountSellPrice = disPrice
            discountVal = discount
            finalPrice = finalVal
        }
        setValues({
            ...values,
            [e.target.name]: e.target.value,
            discountSellPrice: discountSellPrice,
            discount: discountVal,
            finalPrice: finalPrice
        })

    }


    return (
        <Dialog
            onClose={handleClose}
            fullWidth={true}
            maxWidth={'lg'}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <DialogTitle style={{ padding: '5px 15px' }}>
                <Box style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}>
                    <Typography>{`${title}`}</Typography>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent dividers>
                <form class="form-parsley" onSubmit={handleSubmit(localSubmit)}>
                    <Grid container spacing={2} sx={{ mb: 2 }}>
                        <Grid item lg={12}>
                            <Controller
                                name="productName"
                                control={control}
                                render={(props) => (
                                    <TextField
                                        {...props}
                                        fullWidth
                                        variant="outlined"
                                        error={formErrors["productName"]?.message}
                                        size="Normal"
                                        label="Product Name"
                                        placeholder="Enter product name"
                                        helperText={formErrors["productName"]?.message}

                                    />
                                )}
                                rules={{
                                    required: {
                                        value: true,
                                        message: `Product Name is required`,
                                    },
                                }}
                                defaultValue={data && data['productName']}
                            />
                        </Grid>
                        <Grid item lg={12}>
                            <Controller
                                name="description"
                                control={control}
                                render={(props) => (
                                    <TextField
                                        {...props}
                                        fullWidth
                                        variant="outlined"
                                        error={formErrors["description"]?.message}
                                        size="Normal"
                                        label="Description"
                                        placeholder="Enter description"
                                        helperText={formErrors["description"]?.message}

                                    />
                                )}
                                rules={{
                                    required: {
                                        value: true,
                                        message: `Description is required`,
                                    },
                                }}
                                defaultValue={data && data['description']}
                            />
                        </Grid>
                        <Grid item lg={4}>
                            <Controller
                                control={control}
                                name="category"
                                render={(props) => {
                                    return (
                                        <TextField
                                            {...props}
                                            select
                                            fullWidth
                                            variant="outlined"
                                            error={formErrors["category"]?.message}
                                            size="Normal"
                                            label="Category"
                                            onChange={(e) => {
                                                props.onChange(e.target.value);
                                            }}
                                            helperText={formErrors["category"]?.message}
                                        >

                                            {categories.length > 0 ? (
                                                categories?.map((opt, index) => {
                                                    return (
                                                        <MenuItem
                                                            value={opt["cateId"]}
                                                            key={index}
                                                        >
                                                            {opt["categoryName"]}
                                                        </MenuItem>
                                                    );
                                                })
                                            ) : (
                                                <MenuItem selected disabled>
                                                    No Data
                                                </MenuItem>
                                            )}
                                        </TextField>
                                    );
                                }} // props contain
                                rules={{
                                    required: {
                                        value: true,
                                        message: `Category is required`,
                                    },
                                }}
                                defaultValue={data && data['category']}
                            />
                        </Grid>
                        <Grid item lg={4}>
                            <Controller
                                name="costPrice"
                                control={control}
                                render={(props) => (
                                    <TextField
                                        {...props}
                                        fullWidth
                                        variant="outlined"
                                        error={formErrors["costPrice"]?.message}
                                        size="Normal"
                                        label="Cost price"
                                        placeholder="Enter cost price"
                                        helperText={formErrors["costPrice"]?.message}
                                        onChange={(e) => handleChange(e)}
                                        value={values?.costPrice}

                                    />
                                )}
                                defaultValue={data && data['costPrice']}
                            />
                        </Grid>
                        <Grid item lg={4}>
                            <Controller
                                name="sellPrice"
                                control={control}
                                render={(props) => (
                                    <TextField
                                        {...props}
                                        fullWidth
                                        variant="outlined"
                                        error={formErrors["sellPrice"]?.message}
                                        size="Normal"
                                        label="Sell price"
                                        placeholder="Enter sell price"
                                        helperText={formErrors["sellPrice"]?.message}
                                        value={values?.sellPrice}
                                        onChange={(e) => handleChange(e)}
                                    />
                                )}
                                defaultValue={data && data['sellPrice']}
                            />
                        </Grid>
                        <Grid item lg={4}>
                            <Controller
                                name="discount"
                                control={control}
                                render={(props) => (
                                    <TextField
                                        {...props}
                                        fullWidth
                                        variant="outlined"
                                        error={formErrors["discount"]?.message}
                                        size="Normal"
                                        label="Discount"
                                        placeholder="Enter discount"
                                        helperText={formErrors["discount"]?.message}
                                        value={values?.discount || 0}
                                    />
                                )}
                                defaultValue={data && data['discount']}
                            />
                        </Grid>
                        <Grid item lg={4}>
                            <Controller
                                name="discountSellPrice"
                                control={control}
                                render={(props) => (
                                    <TextField
                                        {...props}
                                        fullWidth
                                        variant="outlined"
                                        error={formErrors["discountSellPrice"]?.message}
                                        size="Normal"
                                        label="Discounted sell price"
                                        placeholder="Enter discount sell price"
                                        helperText={formErrors["discountSellPrice"]?.message}
                                        value={values?.discountSellPrice || 0}
                                    />
                                )}
                                defaultValue={data && data['discountSellPrice']}
                            />
                        </Grid>
                        <Grid item lg={4}>
                            <Controller
                                name="finalPrice"
                                control={control}
                                render={(props) => (
                                    <TextField
                                        {...props}
                                        fullWidth
                                        variant="outlined"
                                        error={formErrors["finalPrice"]?.message}
                                        size="Normal"
                                        label="Final price"
                                        placeholder="Enter discount sell price"
                                        helperText={formErrors["finalPrice"]?.message}
                                        value={values?.finalPrice || 0}

                                    />
                                )}
                                defaultValue={data && data['finalPrice']}
                            />
                        </Grid>
                    </Grid>
                    <Button variant="text" onClick={() => handleClose()} color="secondary" >
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </form>

            </DialogContent>
        </Dialog>
    );
};

export default ProductForm;
