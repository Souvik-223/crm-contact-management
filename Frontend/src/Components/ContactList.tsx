import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { redirect } from "react-router-dom";

interface Data {
  _id: number;
  firstName: string;
  lastName: string;
  email: string;
  phonenumber: Number;
  company: string;
  jobtitle: string;
}

const columns = [
  {
    id: "FirstName",
    label: "First Name",
    minWidth: 170,
    align: "left",
    format: String,
  },
  {
    id: "LastName",
    label: "Last Name",
    minWidth: 170,
    align: "left",
    format: String,
  },
  {
    id: "email",
    label: "Email",
    minWidth: 170,
    align: "left",
    format: String,
  },
  {
    id: "phonenumber",
    label: "Phone Number",
    minWidth: 170,
    align: "lef",
    format: String,
  },
  {
    id: "company",
    label: "Company",
    minWidth: 170,
    align: "left",
    format: String,
  },
  {
    id: "jobtitle",
    label: "Jobtitle",
    minWidth: 170,
    align: "left",
    format: String,
  },
  {
    id: "edit",
    label: "JobtEdit",
    minWidth: 20,
    align: "left",
    format: String,
  },
  {
    id: "delete",
    label: "Delete",
    minWidth: 20,
    align: "left",
    format: String,
  },
];

export default function ContactList() {
  const [rows, setrows] = React.useState<Data[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const rows = await axios.get("http://localhost:4000/contact");
        setrows(rows.data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const editContact = async () => {
    redirect("/contact/:id");
  };

  const deleteContact = async (id: number) => {
    try {
      await axios.delete(`http://localhost:4000/contact/${id}`);
      setrows(rows.filter((row) => row._id !== id));
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      return (
                        <TableCell key={column.id}>
                          {column.id === "FirstName" && row.firstName}
                          {column.id === "LastName" && row.lastName}
                          {column.id === "email" && row.email}
                          {column.id === "phonenumber" &&
                            row.phonenumber.toString()}
                          {column.id === "company" && row.company}
                          {column.id === "jobtitle" && row.jobtitle}
                          {column.id === "edit" && (
                            <CiEdit size={20} onClick={editContact} />
                          )}
                          {column.id === "delete" && (
                            <MdDelete
                              size={20}
                              onClick={() => deleteContact(row._id)}
                            />
                          )}
                          {![
                            "FirstName",
                            "LastName",
                            "email",
                            "phonenumber",
                            "company",
                            "jobtitle",
                            "edit",
                            "delete",
                          ].includes(column.id) && "N/A"}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
