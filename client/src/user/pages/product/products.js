import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  CardActions,
  Typography,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CardHeader from "@mui/material/CardHeader";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useNavigate } from "react-router-dom";

import { useGetProductsQuery } from "hooks/api-hook";

const Product = ({
  _id,
  productName,
  price,
  productType,
  imagePath,
  category,
  description,
  features,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const ExpandMore = styled((props) => {
      const { expand, ...other } = props;
      return <IconButton {...other} />;
  })(({ theme, expand }) => ({
      transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
      }),
  }));

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
      setExpanded(!expanded);
  };


  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/products", { state: { id: _id } });
  };

  return (
    <>
      <Card
        onClick={handleClick}
        sx={{
          borderRadius: "0.55rem",
          width: "350px",
          //maxWidth: "100%",
          height: "400px",
          backgroundColor: "#ffffff",
        }}
      >
        <CardActionArea onClick={() => navigate(`/product/${_id}`)}>
          <CardMedia
            sx={{
              //height: "350px",
              height: "200px",
              //width: "340px",
              //background: "cover",
              boxShadow: "-20px -8px 10px 10px #616161"
            }}
            image={`http://localhost:5001/assets/${imagePath}`}
            title={productName}
          />
          <CardContent
            sx={{
              height: "140px",
              backgroundColor: "#1a237e",
              boxShadow: "2px -1px 18px 2px #616161"
            }}
          >
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              fontWeight="bold"
              sx={{
                color: "white",
              }}
            >
              {productName}
            </Typography>
            <Typography variant="h6" color="textSecondary" component="p" fontWeight="bold" sx={{color: "red"}}>
              {productType}
            </Typography>
            <Typography variant="h6" color="textSecondary" component="p" fontWeight="bold" sx={{color: "red"}}>
              {category}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions disableSpacing
          sx={{
            backgroundColor: "#1a237e",
            height: "90px",
            //boxShadow: "2px -1px 18px 2px #616161"
          }}
        >
          <IconButton aria-label="add to favorites">
              <FavoriteIcon />
          </IconButton>
          <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
          >
              <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
      </Card>
    </>
  );
};

const Products = () => {
  const { data } = useGetProductsQuery();
  const isNonMobile = useMediaQuery("(min-width: 1000px");

  return (
    <>
      <Box m="1.5rem 2.5rem">
        {data ? (
          <Box
            mt="20px"
            display="grid"
            gridTemplateColumns="repeat(3, minmax(0, 1fr))"
            justifyContent="space-between"
            rowGap="20px"
            columnGap="20px"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {data.map(
              ({
                _id,
                productName,
                price,
                productType,
                imagePath,
                category,
                description,
                features,
              }) => (
                <Product
                  key={_id}
                  _id={_id}
                  productName={productName}
                  price={price}
                  productType={productType}
                  imagePath={imagePath}
                  category={category}
                  description={description}
                  features={features}
                />
              )
            )}
          </Box>
        ) : (
          <div justifyContent="center">No products available</div>
        )}
      </Box>
    </>
  );
};

export default Products;

{
  /*

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "20px",
          }}
        >
          <input
            id="searchInput"
            type="text"
            value={searchTerm}
            placeholder="  Search a Product"
            style={{
              width: "40%",
              height: "55px",
              padding: "10px",
              border: "0px solid",
              outline: "none",
              boxShadow: "5px 10px 13px 2px #888888",
              borderRadius: "30px",
              color: "rgb(1, 1, 59)",
              alignItems: "center",
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon
                    style={{
                      marginLeft: "10px",
                    }}
                  />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            size="medium"
            style={{
              width: "8%",
              height: "45px",
              textTransform: "unset",
              fontSize: "0.9rem",
              fontWeight: "bold",
              marginLeft: "20px",
              borderRadius: "25px",
              backgroundColor: "#357a38",
              border: "none",
              "&:hover": {
                backgroundColor: "#91ff35",
                cursor: "pointer",
              },
            }}
          >
            Search
          </Button>
        </div>
*/
}
