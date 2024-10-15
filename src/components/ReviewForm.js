import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ReviewSchema = Yup.object().shape({
  content: Yup.string()
    .min(10, 'Review must be at least 10 characters')
    .required('Review content is required'),
  rating: Yup.number()
    .min(1, 'Rating must be between 1 and 5')
    .max(5, 'Rating must be between 1 and 5')
    .required('Rating is required'),
});

function ReviewForm({ onSubmit }) {
  return (
    <Formik
      initialValues={{ content: '', rating: '' }}
      validationSchema={ReviewSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <div>
            <Field name="content" as="textarea" />
            <ErrorMessage name="content" component="div" />
          </div>
          <div>
            <Field name="rating" type="number" />
            <ErrorMessage name="rating" component="div" />
          </div>
          <button type="submit">Submit Review</button>
        </Form>
      )}
    </Formik>
  );
}

export default ReviewForm;
