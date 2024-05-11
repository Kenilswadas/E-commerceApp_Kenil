import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  deleteDoc,
  onSnapshot,
  updateDoc,
} from "@firebase/firestore";
import { db } from "../FirebaseConfig/Firebaseconfig";
import { Button } from "./Buttons";
import { MdDelete } from "react-icons/md";
import { MdUpdate } from "react-icons/md";
import Pagination from "@mui/material/Pagination";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { toast } from "react-toastify";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "",
    color: theme.palette.common.white,
    textalign: "center",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 11,
    textalign: "center",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  "&:hover": {
    backgroundColor: "rgb(75, 85, 99,0.2)",
  },
}));
// Function to slice products based on current page and items per page

export default function CustomizedTables({
  setDisplayform,
  displayform,
  setisupdate,
  setDocId,
  setIsLoading,
  isLoading,
  setMyProduct,
  handleUpdate,
}) {
  // const [items, setItems] = useState([]);
  const [Products, setproducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Number of items per page

  const getItems = async () => {
    // let arr = [];
    const mycollection = collection(db, "MyProducts");
    // const querySnapshot = await getDocs(mycollection);
    // querySnapshot.map((doc) => {
    //   const data = doc.data();
    //   arr.push(data);
    //   console.log(data);
    // });
    // setItems(arr);
    const alldata = onSnapshot(mycollection, async (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setproducts(data);
    });
    return alldata;
  };
  // console.log(Products);
  useEffect(() => {
    getItems();
  }, []);

  //handleDelete
  const handleDelete = async (id) => {
    setIsLoading(true);
    await deleteDoc(doc(db, "MyProducts", id))
      .then((e) => {
        toast.success("successfully deleted !");
      })
      .catch((error) => {
        toast.error("opps ! error occurs ...");
      })
      .finally((e) => {
        setIsLoading(false);
      });
  };
  //handleUpdate
  const handleUpdateview = (id) => {
    setDocId(id);
    onSnapshot(collection(db, "MyProducts"), (snap) => {
      const data = snap.docs.map((doc) => ({
        docId: doc.id,
        ...doc.data(),
      }));
      const myProduct = data.find((item) => item.docId === id);
      if (myProduct) {
        setMyProduct(myProduct);
      }
      setisupdate(true);
      if (displayform) {
        setDisplayform(false);
      } else {
        setDisplayform(true);
      }
    });
  };

  // Function to handle page change
  const handlePageChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to handle items per page change
  const handleItemsPerPageChange = (event) => {
    const newItemsPerPage = parseInt(event.target.value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to the first page when changing items per page
  };
  const paginate = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return Products.slice(startIndex, endIndex);
  };
  return (
    <div className="flex items-center justify-center shadow-xl  bg-slate-400">
      <Paper sx={{ width: "1000px", overflow: "hidden", overflowY: "hidden" }}>
        <TableContainer component={Paper}>
          <Table
            // sx={{ maxWidth: 800 }}
            // aria-label="customized table"
            // stickyHeader
            aria-label="sticky table"
            // className="w-3/4"
          >
            <TableHead className="bg-[#217aa9]">
              <TableRow>
                <StyledTableCell align="center">Product Image</StyledTableCell>
                <StyledTableCell align="center">Product Name</StyledTableCell>
                <StyledTableCell align="center">
                  Product Description
                </StyledTableCell>
                <StyledTableCell align="center">Product Price</StyledTableCell>
                <StyledTableCell align="center">
                  Discounted Price
                </StyledTableCell>
                <StyledTableCell align="center">Category</StyledTableCell>
                <StyledTableCell align="center">Sub Category</StyledTableCell>
                <StyledTableCell align="center">Base Category</StyledTableCell>
                <StyledTableCell align="center">Product Id</StyledTableCell>
                <StyledTableCell align="center" colSpan={2}>
                  Actions
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ scrollBehavior: "true" }}>
              {paginate().map((data) => (
                <StyledTableRow key={data.id}>
                  <StyledTableCell
                    scope="row"
                    className="flex justify-center items-center"
                  >
                    <img src={data.ProductImage} className="m-auto" alt="" />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {data.ProductName}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {data.ProductDescription}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {data.ProductPrice}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {data.DiscountedPrice}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {data.Category}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {data.SubCategory}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {data.BaseCategory}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {data.ProductId}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      btnName={"delete"}
                      faicon={<MdDelete size={20} />}
                      clickHandler={() => handleDelete(data.id)}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      btnName={"update"}
                      faicon={<MdUpdate size={20} />}
                      clickHandler={() => handleUpdateview(data.id)}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex items-center justify-center m-4">
            <Select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              sx={{ height: "30px" }}
              style={{
                color: "#ebf1f1",
                backgroundColor: "#217aa9",
                borderRadius: "200px",
              }} // Set the minimum width of the select
            >
              <MenuItem value={5}>5 per page</MenuItem>
              <MenuItem value={10}>10 per page</MenuItem>
              <MenuItem value={15}>15 per page</MenuItem>
            </Select>
            <Pagination
              count={Math.ceil(Products.length / itemsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </div>
        </TableContainer>
      </Paper>
    </div>
  );
}
