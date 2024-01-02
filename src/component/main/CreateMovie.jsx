import React from "react";
import { useState } from "react";
import DragIcon from "../../assets/images/drop_img.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addNewMovie } from "../../store/actions/MovieActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateMovie = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState(null);
  const [imageErr, setImageErr] = useState("");
  const movieListData = useSelector((state) => state.movieReducer.movies);

  const handleCancel = () => {
    setImageUrl(null);
    formik.resetForm();
    navigate("/movieList");
  };

  const handleSubmit = () => {
    formik.handleSubmit();
  };

  const handleFile = (e) => {
    let imageFile = e.target.files[0];
    previewFile(imageFile);
  };

  const previewFile = (img) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setImageUrl(fileReader.result);
    };
    fileReader.readAsDataURL(img);
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      publishingYear: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Please Enter Movie Title"),
      publishingYear: Yup.string()
        .length(4, "Publishing Year must be 4 characters")
        .required("Please Enter Publishing Year"),
    }),
    onSubmit: (values) => {
      let data = {
        id: movieListData.length + 1,
        title: values.title,
        publishingYear: values.publishingYear,
        poster: imageUrl,
      };
      if (imageUrl !== null) {
        setImageErr("");
        dispatch(addNewMovie(data));
        setImageUrl(null);
        formik.resetForm();
        toast.success("New Movie Created Successfully");
        navigate("/movieList");
      } else {
        setImageErr("Please Select The Image");
      }
    },
  });

  return (
    <div className="page_outer">
      <div className="container_page">
        <div className="inner_page">
          <h2 className="page_title">Create a new movie</h2>
          <div className="row">
            <div className="col-12 col-md-5 col-lg-5">
              <div className="file_selector_wrapper">
                {!imageUrl ? (
                  <>
                    <input
                      type={"file"}
                      title=""
                      accept="image/*"
                      name="moviePoster"
                      className="file_selector_input"
                      onChange={(e) => handleFile(e)}
                    />
                    <img src={DragIcon} className="preview_img_placeholder" />
                  </>
                ) : (
                  <img src={imageUrl} alt="Preview" className="preview_img" />
                )}
              </div>
              {imageErr !== "" && (
                <p className="err_msg my-2 mx-3">{imageErr}</p>
              )}
            </div>
            <div className="col-12 col-md-7 col-lg-5">
              <div className="input_wrapper">
                <input
                  type={"text"}
                  name="title"
                  className="input_box"
                  placeholder="Title"
                  onChange={formik.handleChange}
                  value={formik.values.title}
                />
                {formik.touched.title && formik.errors.title && (
                  <p className="err_msg mb-0">{formik.errors.title}</p>
                )}
              </div>
              <div className="input_wrapper publish_year_outer">
                <input
                  type={"number"}
                  name="publishingYear"
                  className="input_box"
                  placeholder="Publishing year"
                  onChange={formik.handleChange}
                  value={formik.values.publishingYear}
                />
                {formik.touched.publishingYear &&
                  formik.errors.publishingYear && (
                    <p className="err_msg mb-0">
                      {formik.errors.publishingYear}
                    </p>
                  )}
              </div>
              <div className="row py-4 py-md-4 py-lg-5">
                <div className="col-md-6">
                  <button
                    className="btn_common btn_outlined "
                    onClick={() => handleCancel()}
                  >
                    Cancel
                  </button>
                </div>
                <div className="col-md-6">
                  <button
                    className="btn_common btn_global"
                    onClick={() => handleSubmit()}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateMovie;
