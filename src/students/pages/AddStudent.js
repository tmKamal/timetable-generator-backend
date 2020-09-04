import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import {
  CssBaseline,
  Paper,
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(5),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },

  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(3),
  },
  alignRight: {
    textAlign: "right",
  },
  errorTextShow: {
    color: "red",
    display: "block",
  },
  errorTextHide: {
    color: "black",
    display: "none",
  },
}));

const AddStudent = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    academicYearSem: "",
    programme: "",
    groupNumber: "",
    subGroupNumber: "",
  });

  const { academicYearSem, programme, groupNumber, subGroupNumber } = state;

  const onChangeHandler = (inputFieldName) => (e) => {
    setState({ ...state, [inputFieldName]: e.target.value });
  };
  const handleChange = (event) => {
    setState(event.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const group = {
      academicYearSem,
      programme,
      groupNumber,
      subGroupNumber,
    };
    const body = { group };
    console.log(body);
  };

  return (
    <React.Fragment>
      <CssBaseline />

      <main style={{ marginTop: "100px" }} className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography
            style={{ marginBottom: "20px" }}
            component="h1"
            variant="h4"
            align="center"
          >
            Add Student Group
          </Typography>

          <form onSubmit={submitHandler} className={classes.form} noValidate>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="academicYearSem">
                    Academic Year and Semester
                  </InputLabel>
                  <Select
                    labelId="academicYearSem"
                    id="academicYearSem"
                    value={academicYearSem}
                    onChange={handleChange}
                    label="Academic Year and Semester"
                    style={{ width: "510px" }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={1}>Y1.S1</MenuItem>
                    <MenuItem value={2}>Y1.S2</MenuItem>
                    <MenuItem value={3}>Y2.S1</MenuItem>
                    <MenuItem value={4}>Y2.S2</MenuItem>
                    <MenuItem value={5}>Y3.S1</MenuItem>
                    <MenuItem value={6}>Y3.S2</MenuItem>
                    <MenuItem value={7}>Y4.S1</MenuItem>
                    <MenuItem value={8}>Y4.S2</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="programme">
                    Academic Year and Semester
                  </InputLabel>
                  <Select
                    labelId="programme"
                    id="programme"
                    value={programme}
                    onChange={handleChange}
                    label="Programme"
                    style={{ width: "510px" }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={1}>IT</MenuItem>
                    <MenuItem value={2}>CSSE</MenuItem>
                    <MenuItem value={3}>CSE</MenuItem>
                    <MenuItem value={4}>IM</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  onChange={onChangeHandler("groupNumber")}
                  value={groupNumber}
                  id="groupNumber"
                  name="groupNumber"
                  variant="outlined"
                  label="Group Number"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  onChange={onChangeHandler("subGroupNumber")}
                  value={subGroupNumber}
                  id="subGroupNumber"
                  name="subGroupNumber"
                  variant="outlined"
                  label="Sub Group Number"
                  fullWidth
                />
              </Grid>
            </Grid>

            <div className={classes.buttons}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Submit
              </Button>
            </div>
          </form>
        </Paper>
      </main>
    </React.Fragment>
  );
};
export default AddStudent;