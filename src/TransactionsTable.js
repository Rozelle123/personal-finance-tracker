import React, { useState, useReducer, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  Collapse,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import rows from "./transactions.json";
import { transactionReducer } from "./handleTransactionReducer";

const calculateTotalAmount = (details) => {
  return details.reduce((total, transaction) => total + transaction.amount, 0);
};

function CollapsibleRow({ row, dispatch }) {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [detailId, setDetailId] = useState(0);
  const [dialogName, setDialogName] = useState("");

  const handleModalClose = () => {
    setModalOpen(false);
    clearDetails();
    setIsEditing(false);
    setIsDeleting(false);
  };
  const handleDeleteModalClose = () => {
   
    setDeleteConfirm(false);
  };
  const handleModalOpen = () => setModalOpen(true);

  const clearDetails = () => {
    setDate("");
    setDesc("");
    setAmount(0);
    
  };

  const totalAmount = calculateTotalAmount(row.details || []);
  const handleSubmitTransaction = (date, desc, amount, key, detailId) => {
    if (isEditing) {
      const updatedTransaction = {
        date: date,
        desc: desc,
        amount: amount,
      };

      dispatch({
        type: "EDIT_TRANSACTION",
        payload: {
          detId: detailId,
          catId: key,
          transaction: {
            date: updatedTransaction.date,
            desc: updatedTransaction.desc,
            amount: updatedTransaction.amount,
          },
        },
      });
    } else if (isDeleting) {
      setDeleteConfirm(true);
    } else {
      const newTransaction = {
        date: date,
        desc: desc,
        amount: amount,
        detailId: 10,
      };

      dispatch({
        type: "ADD_TRANSACTION",
        payload: {
          catId: key,
          transaction: {
            date: newTransaction.date,
            desc: newTransaction.desc,
            amount: newTransaction.amount,
            detId: newTransaction.detailId,
          },
        },
      });
    }
    clearDetails();
    setIsEditing(false);
    setIsDeleting(false);
    handleModalClose();
  };

  const handleDeleteTransaction = (key, detailId) => {
   
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: {
        detId: detailId,
        catId: key,
      },
    });

    setDeleteConfirm(false);
    setIsDeleting(false);
    handleDeleteModalClose();
  };

  const handleEditButton = (detail) => {
    setIsEditing(true);
    setDialogName("Edit Transaction");
    setDate(detail.date);
    setDesc(detail.desc);
    setAmount(detail.amount);
    setDetailId(detail.detId);
    handleModalOpen();
  };

  const handleAddButton = () => {
    setIsEditing(false);
    setDialogName("Add Transaction");
    handleModalOpen();
  };

  const handleDeleteButton = (detail) => {
    
    setIsDeleting(true);
    setDialogName("Delete Transaction");
    setDate(detail.date);
    setDesc(detail.desc);
    setAmount(detail.amount);
    setDetailId(detail.detId);
    handleModalOpen();
   
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>
          <img
            src={row.image}
            alt=""
            style={{ width: "35px", height: "35px" }}
          />
        </TableCell>
        <TableCell>{row.category}</TableCell>
        <TableCell style={{ fontWeight: "bold" }}>
          {" "}
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(totalAmount)}
        </TableCell>
        <TableCell>
          <IconButton aria-label="Add" onClick={handleAddButton}>
            <AddIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={6} style={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="body2" style={{ fontWeight: "bold" }}>
                TRANSACTION HISTORY:
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ width: "180px", fontWeight: "bold" }}>
                      Date
                    </TableCell>
                    <TableCell style={{ width: "300px", fontWeight: "bold" }}>
                      Description
                    </TableCell>
                    <TableCell style={{ fontWeight: "bold" }}>Amount</TableCell>
                    <TableCell className="collapsible-table-buttons"></TableCell>
                    <TableCell className="collapsible-table-buttons"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.details?.map((detail, index) => (
                    <TableRow
                      key={index}
                      style={{
                        backgroundColor:
                          index % 2 === 0 ? "#f8f9fa" : "#ffffff",
                      }}
                    >
                      <TableCell>
                        {detail?.date || "No date provided"}
                      </TableCell>
                      <TableCell>
                        {detail?.desc || "No desc provided"}
                      </TableCell>
                      <TableCell>
                        {detail?.amount
                          ? new Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: "USD",
                            }).format(detail.amount)
                          : "No amount provided"}
                      </TableCell>
                      <TableCell className="collapsible-table-buttons">
                        <IconButton
                          aria-label="Edit"
                          onClick={() => {
                            handleEditButton(detail);
                          }}
                        >
                          <EditIcon sx={{ color: "blue" }} />
                        </IconButton>
                      </TableCell>
                      <TableCell className="collapsible-table-buttons">
                        <IconButton
                          aria-label="Delete"
                          onClick={() => handleDeleteButton(detail)}
                        >
                          <DeleteIcon sx={{ color: "red" }} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

      {/* Modal add, edit and delete */}
      <Dialog open={modalOpen} onClose={handleModalClose}>
        <DialogTitle>{dialogName}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              onChange={(e) => setDate(e.target.value)}
              value={date}
              label="Date"
              type="date"
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              sx={{ width: "150px" }}
            />
            <TextField
              onChange={(e) => setAmount(Number(e.target.value))}
              value={amount}
              label="Amount"
              type="currency"
              margin="normal"
              sx={{ width: "150px" }}
            />
          </Box>
          <TextField
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
            label="Description"
            type="currency"
            margin="normal"
            sx={{ width: "320px" }}
          />

          <div style={{ marginTop: "16px", textAlign: "right" }}>
            <Button onClick={handleModalClose} color="secondary">
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginLeft: "8px" }}
              onClick={() =>
                handleSubmitTransaction(date, desc, amount, row.catId, detailId)
              }
            >
              {isEditing ? "SAVE" : isDeleting ? "DELETE" : "ADD"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteConfirm} onClose={handleDeleteModalClose}>
        <DialogTitle>Delete Transaction</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this transaction?
          </Typography>
          <div style={{ marginTop: "16px", textAlign: "right" }}>
            <Button onClick={handleDeleteModalClose} color="secondary">
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginLeft: "8px" }}
              onClick={() =>
                handleDeleteTransaction(row.catId, detailId)
              }
            >
              DELETE
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function CollapsibleTable() {
  const [transactions, dispatch] = useReducer(transactionReducer, rows);

  return (
    <TableContainer component={Paper} className="table-container">
      <Table aria-label="collapsible table">
        <TableBody>
          {transactions.map((row) => (
            <CollapsibleRow key={row.id} row={row} dispatch={dispatch} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CollapsibleTable;
