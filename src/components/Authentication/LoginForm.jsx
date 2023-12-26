import React from "react";
import Grid from "@mui/material/Grid";
import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { loginUser } from "../../Store/Auth/auth.action";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email!").required("Email is required!"),
  password: Yup.string().required("Password is required!"),
});

const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    dispatch(loginUser(values));
    console.log(values);
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            variant="outlined"
            size="large"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Password"
            name="password"
            variant="outlined"
            size="large"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Grid>

        <Grid item className="mt-20" xs={12}>
          <Button
            sx={{ borderRadius: "29px", py: "15px", bgcolor: "blue" }}
            fullWidth
            variant="contained"
            size="large"
            type="submit"
          >
            Signin
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default LoginForm;
