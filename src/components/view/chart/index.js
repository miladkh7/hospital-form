import * as React from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { CSVLink, CSVDownload } from "react-csv";

function createData(
  id,
  hospitalName,
  block,
  province,
  city,
  floorsUnder,
  floorsOn,
  createdDate,
  designedDate,
  serviceDate,
  latitude,
  longitude,
  bedsNumber,
  impactFactor,
  unitPrice,
  soilType,
  address,
  floorsNo,
  standardEdition,
  controlSystem,
  material,
  lateralLoadResistantX,
  lateralLoadResistantY,
  vertical,
  plan
) {
  return {
    id,
    hospitalName,
    block,
    province,
    city,
    floorsUnder,
    floorsOn,
    createdDate,
    designedDate,
    serviceDate,
    latitude,
    longitude,
    bedsNumber,
    impactFactor,
    unitPrice,
    soilType,
    address,
    floorsNo,
    standardEdition,
    controlSystem,
    material,
    lateralLoadResistantX,
    lateralLoadResistantY,
    vertical,
    plan,
  };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export default function Chart({ data }) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const titles = Object.entries(data[0]).map(([id, value]) => {
    return { id };
  });
  const rows = data.map((item, index) => {
    console.log(item, "itemitmeitmeitmeim");
    return createData(
      index,
      item.name,
      item.block,
      item.province,
      item.city,
      item.floor_under,
      item.floor_on,
      item.created_date,
      item.design_date,
      item.sercice_date,
      item.latitude,
      item.longitude,
      item.beds_num,
      item.impact_factor,
      item.unit_price,
      item.soil_type,
      item.address,
      item.floorsNo,
      item.standardEdition,
      item.controlSystem,
      item.material,
      item.lateralLoadResistantX,
      item.lateralLoadResistantY,
      item.vertical,
      item.plan
    );
  });
  function EnhancedTableHead(props) {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      onRequestSort,
    } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox"></TableCell>
          {titles.map((headCell) => {
            if (["medical_components","classification", "floors", "charts"].includes(headCell.id)) {
              return null;
            }
            const labelContent = (headCellName) => {
              switch (headCellName) {
                case "plan":
                  return "irregularityPlan";
                case "vertical":
                  return "irregularityVertical";
                case "lateralLoadResistantX":
                  return "lateralLoadResistingX";
                case "lateralLoadResistantY":
                  return "lateralLoadResistingY";
                default:
                  return headCell.id;
              }
            };
            return (
              <TableCell
                key={headCell.id}
                align={headCell.numeric ? "right" : "left"}
                padding={headCell.disablePadding ? "none" : "normal"}
                sortDirection={orderBy === headCell.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={createSortHandler(headCell.id)}
                >
                  {labelContent(headCell.id)}
                  {orderBy === headCell.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            );
          })}
          <TableCell align={"left"} padding={"normal"}>
            <TableSortLabel direction={orderBy === "export" ? order : "asc"}>
              {"Export"}
            </TableSortLabel>
          </TableCell>
        </TableRow>
      </TableHead>
    );
  }

  EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(["asc", "desc"]).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                console.log(row, "rowrowrowrow");
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox"></TableCell>
                    <TableCell padding="checkbox">{row.id}</TableCell>
                    <TableCell
                      component="th"
                      align="left"
                      scope="row"
                      paddingLeft="10px"
                    >
                      {row.hospitalName}
                    </TableCell>
                   
                    {/* <TableCell align="left">{row.block}</TableCell> */}
                    <TableCell align="left">{row.province}</TableCell>
                    <TableCell align="left">{row.city}</TableCell>
                    <TableCell align="left">{row.createdDate}</TableCell>
                    <TableCell align="left">{row.designedDate}</TableCell>
                    <TableCell align="left">{row.serviceDate}</TableCell>
                    <TableCell align="left">{row.floorsOn}</TableCell>
                    <TableCell align="left">{row.floorsUnder}</TableCell>
                    <TableCell align="left">{row.address}</TableCell>
                    <TableCell align="left">{row.latitude}</TableCell>
                    <TableCell align="left">{row.longitude}</TableCell>
                    <TableCell align="left">{row.bedsNumber}</TableCell>
                    <TableCell align="left">{row.impactFactor}</TableCell>
                    <TableCell align="left">{row.unitPrice}</TableCell>
                    <TableCell align="left">{row.soilType}</TableCell>
                    {/* 
                    
                    
                    
                    
                    
                    <TableCell align="left">{row.floorsNo}</TableCell>
                    <TableCell align="left">{row.standardEdition}</TableCell>
                    <TableCell align="left">{row.controlSystem}</TableCell>
                    <TableCell align="left">{row.material}</TableCell> */}
                    {/* <TableCell align="center">
                      {row.lateralLoadResistantX}
                    </TableCell>
                    <TableCell align="center">
                      {row.lateralLoadResistantY}
                    </TableCell>
                    <TableCell align="center">
                      {row.vertical ? "true" : "false"}
                    </TableCell>
                    <TableCell align="center">
                      {row.plan ? "true" : "false"}
                    </TableCell> */}
                    <TableCell>
                      <CSVLink
                        data={data}
                        filename={`hospital-${row.name}.csv`}
                      >
                        Export
                      </CSVLink>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
