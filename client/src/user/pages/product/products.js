import React, { useState } from 'react';
import { Container, InputAdornment, TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { borderRadius, color } from '@mui/system';
import { Input } from '@mui/icons-material';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

const Products = () => {

    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    }

  return (
    <>
        <section>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "20px"
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
                    alignItems: "center"
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <SearchIcon 
                            style={{
                                marginLeft: "10px"
                            }}
                            />
                        </InputAdornment>
                    ),
                }}
                />
                <Button variant="contained" size="medium"
                style={{
                    width: "8%",
                    height: "45px",
                    textTransform:"unset",
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
                >Search</Button>
            </div>
        </section>
        <section>
            <div class="container"
                style={{
                    boxSizing: "border-box",
                    marginTop: "50px",
                    paddingLeft: "50px",
                    paddingRight: "50px",
                }}
            >
                <div class="row row-cols1 row-cols-md-2 g-4">
                    <div class="col-md-3">
                        <div
                            style={{
                                borderRadius: "20px",
                                width: "14rem",
                               // boxShadow: "0 1px 10px 0 rgba(0, 0, 0, 0.2), 0 1px 10px 0 rgba(0, 0, 0, 0.19)"
                            }}
                        >     
                            <div 
                                style={{
                                    width: "19rem",
                                    height: "12rem"
                                }}
                            >
                                <img 
                                alt= ""
                                src="https://www.mustups.com/wp-content/webpc-passthru.php?src=https://www.mustups.com/wp-content/uploads/2018/12/PV18PRO-1-1.jpg&nocache=1"
                                style={{
                                    boxShadow: "2px -1px 18px 2px",
                                    borderTopRightRadius: "20px",
                                    borderTopLeftRadius: "20px",
                                    maxHeight: "14rem",
                                    maxWidth: "14rem",
                                }}
                                />
                            </div>
                            

                            <div 
                                style={{
                                    width: "14rem",
                                    marginTop: "33px",
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                    color: "white",
                                    borderBottomLeftRadius: "20px",
                                    borderBottomRightRadius: "20px",
                                    boxShadow: "2px -1px 18px 2px #616161",
                                    backgroundColor: "#1a237e",
                                    padding: "10px 15px"
                                }}
                            >
                                <h6 
                                    style={{
                                        fontWeight: "bold",
                                    }}
                                >High Frequency Off Grid Solar Inverter</h6>
                                <h7 
                                    style={{
                                        fontSize: "0.8rem",
                                        fontWeight: "bold",
                                        color: "#b2102f"
                                    }}
                                ><strong>PV1800 Pro Series(PV:450V 3/5.2KW)</strong></h7><br/>
                                <StarOutlineIcon style={{color: "#b2102f"}}/><span 
                                style={{fontSize: "0.85rem"}}>
                                    Rated Power: 3/5.2KW</span><br />
                                <StarOutlineIcon style={{color: "#b2102f"}}/><span
                                style={{fontSize: "0.8rem"}}>
                                    Battery Voltage: 24/48VDC</span><br />
                                <StarOutlineIcon style={{color: "#b2102f"}}/><span
                                style={{fontSize: "0.8rem", fontWeight: "bold",}}>Pv Charge Current: 80A</span>
                            </div>
                            <div class="card-text">
                                <div class="tags">
                                    <span class="badge bg-info border-0"></span>
                                </div> 
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section> 
    </>
    
    
  )
}

export default Products;
