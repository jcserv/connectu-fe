import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { Form, withFormik } from "formik";
import React, { useState } from "react";
import { defineMessages, useIntl } from "react-intl";
import * as Yup from "yup";

import locales from "../content/locale";

const messages = defineMessages({
  createAcct: {
    id: "create-acct",
    description: locales.en["create-acct"],
    defaultMessage: locales.en.test,
  },
  emailAddress: {
    id: "email-address",
    description: locales.en["email-address"],
    defaultMessage: locales.en["email-address"],
  },
  emailHelperText: {
    id: "email-helper-text",
    description: locales.en["email-helper-text"],
    defaultMessage: locales.en["email-helper-text"],
  },
  password: {
    id: "password",
    description: locales.en.password,
    defaultMessage: locales.en.password,
  },
  confirmPassword: {
    id: "confirm-password",
    description: locales.en["confirm-password"],
    defaultMessage: locales.en["confirm-password"],
  },
});

const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .matches(
      /(^[A-Za-z0-9._%+-]+@mail.utoronto.ca$|^[A-Za-z0-9._%+-]+@utoronto.ca$)/,
      "Email does not end with valid domain"
    )
    .required(),
  password: Yup.string().required(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required(),
});

const RegisterForm = ({
  errors,
  setFieldValue,
  values: { email, password, confirmPassword },
}) => {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const isValid = email && password && confirmPassword;
  const { formatMessage } = useIntl();
  return (
    <Form className="col-6 w-25">
      <FormControl
        id="email"
        isRequired
        isInvalid={hasSubmitted && errors.email}
      >
        <FormLabel>{formatMessage(messages.emailAddress)}</FormLabel>
        <Input
          type="email"
          onChange={(e) => setFieldValue("email", e.target.value)}
        />
        <FormHelperText>
          {formatMessage(messages.emailHelperText)}
        </FormHelperText>
        {hasSubmitted && <Text color="red">{errors.email}</Text>}
      </FormControl>
      <FormControl
        id="password"
        isRequired
        mt={2}
        isInvalid={hasSubmitted && errors.confirmPassword}
      >
        <FormLabel>{formatMessage(messages.password)}</FormLabel>
        <Input
          type="password"
          onChange={(e) => setFieldValue("password", e.target.value)}
        />
        {hasSubmitted && <Text color="red">{errors.password}</Text>}
      </FormControl>
      <FormControl
        id="confirmPassword"
        isRequired
        mt={2}
        isInvalid={hasSubmitted && errors.confirmPassword}
      >
        <FormLabel>{formatMessage(messages.confirmPassword)}</FormLabel>
        <Input
          type="password"
          onChange={(e) => setFieldValue("confirmPassword", e.target.value)}
        />
        {hasSubmitted && <Text color="red">{errors.confirmPassword}</Text>}
      </FormControl>
      <Button
        className="w-100 mt-4"
        isDisabled={!isValid}
        colorScheme="green"
        type="submit"
        onClick={() => setHasSubmitted(true)}
      >
        {formatMessage(messages.createAcct)}
      </Button>
    </Form>
  );
};

export const EnhancedRegisterForm = withFormik({
  enableReinitialize: true,
  handleSubmit: ({ email, password, confirmPassword }) => {
    // eslint-disable-next-line no-console
    console.log({ email, password, confirmPassword });
  },
  mapPropsToValues: () => ({
    email: "",
    password: "",
    confirmPassword: "",
  }),
  validationSchema: () => RegisterSchema,
  validateOnBlur: true,
  validateOnChange: true,
  validateOnMount: true,
})(RegisterForm);

export default EnhancedRegisterForm;
