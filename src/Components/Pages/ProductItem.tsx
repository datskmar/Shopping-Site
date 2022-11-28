import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchSingleProduct } from "../redux/reducers/singleProduct";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Box, IconButton, Typography, Button } from "@mui/material";

import { RootState } from "../redux/store";
import { addItemToCart } from "../redux/reducers/cart";
import { useAppSelector, useAppDispatch } from "../hooks/reactHooks";
import { deleteOne } from "../redux/reducers/singleProduct";
import ProductForm from "./ProductForm";

const ProductItem = () => {
  const params = useParams();
  const productItem = useAppSelector(
    (state: RootState) => state.singleProductReducer
  );
  const dispatch = useAppDispatch();
  const user = useAppSelector(
    (state: RootState) => state.usersReducer.currentUser
  );

  useEffect(() => {
    if (params.id !== undefined) {
      let id = Number(params.id);
      dispatch(fetchSingleProduct(id));
    }
  }, [dispatch]);

  const addToCart = (
    id: number,
    title: string,
    price: number,
    image: string
  ) => {
    dispatch(addItemToCart({ id, title, price, image, quantity: 1 }));
  };

  return (
    <Box>
      <ProductForm />
      <Box display="flex" flexDirection="column" key={productItem?.id}>
        <img
          src={`${productItem?.images}`}
          alt={productItem?.title}
          loading="lazy"
        />
        <Typography>{productItem?.title}</Typography>
        <Typography>{productItem?.price}</Typography>
        <IconButton
          sx={{ color: "rgba(255, 255, 255, 0.54)" }}
          onClick={() =>
            addToCart(
              productItem?.id,
              productItem?.title,
              productItem?.price,
              productItem?.images[0]
            )
          }
        >
          <ShoppingCartIcon />
        </IconButton>
        <Typography variant="h5">{productItem?.description}</Typography>
      </Box>
    </Box>
  );
};

export default ProductItem;
