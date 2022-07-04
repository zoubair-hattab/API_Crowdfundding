import Head from "next/head";
import { useState, useContext } from "react";
import { DataContext } from "../../store/GlobalState";
import { imageUpload } from "../../utils/imageUpload";
import { postData } from "../../utils/fetchData";
import valid from "../../utils/valid";
import { useRouter } from "next/router";

const CompaingsManager = () => {
  const router = useRouter();
  const initialState = {
    title: " ",
    short_description: " ",
    long_description: " ",
    creator_address: " ",
    amount: " ",
    full_name: " ",
    email: " ",
    phone_number: " ",
    linkedin_link: " ",
    telegram: " ",
  };
  const [compaing, setCompaing] = useState(initialState);
  const {
    title,
    short_description,
    long_description,
    creator_address,
    amount,
    full_name,
    email,
    phone_number,
    linkedin_link,
    telegram,
  } = compaing;

  const [images, setImages] = useState([]);

  const { state, dispatch } = useContext(DataContext);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setCompaing({ ...compaing, [name]: value });
    dispatch({ type: "NOTIFY", payload: {} });
  };

  const handleUploadInput = (e) => {
    dispatch({ type: "NOTIFY", payload: {} });
    let newImages = [];
    let num = 0;
    let err = "";
    const files = [...e.target.files];

    if (files.length === 0)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Files does not exist." },
      });

    files.forEach((file) => {
      if (file.size > 1024 * 1024)
        return (err = "The largest image size is 1mb");

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return (err = "Image format is incorrect.");

      num += 1;
      if (num <= 5) newImages.push(file);
      return newImages;
    });

    if (err) dispatch({ type: "NOTIFY", payload: { error: err } });

    const imgCount = images.length;
    if (imgCount + newImages.length > 5)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Select up to 5 images." },
      });
    setImages([...images, ...newImages]);
  };

  const deleteImage = (index) => {
    const newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errMsg = valid(
      compaing.title,
      compaing.short_description,
      compaing.long_description,
      compaing.amount,
      compaing.full_name,
      compaing.email,
      compaing.phone_number,
      compaing.linkedin_link,
      compaing.telegram
    );

    if (errMsg && images.length === 0)
      return dispatch({ type: "NOTIFY", payload: { error: errMsg } });
    dispatch({ type: "NOTIFY", payload: { loading: true } });
    let media = [];
    const imgNewURL = images.filter((img) => !img.url);
    const imgOldURL = images.filter((img) => img.url);

    if (imgNewURL.length > 0) media = await imageUpload(imgNewURL);

    let res;
    res = await postData("compaing", {
      ...compaing,
      images: [...imgOldURL, ...media],
    });
    if (res.err)
      return dispatch({ type: "NOTIFY", payload: { error: res.err } });
    dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    router.push("/");
  };

  return (
    <div>
      <Head>
        <title>Compaing Manager</title>
      </Head>
      <form className="row" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label htmlFor=" amount">Title *</label>

          <input
            type="text"
            name="title"
            value={title}
            placeholder="Title"
            className="d-block my-4 w-100 p-2"
            onChange={handleChangeInput}
          />

          <div className="row">
            <div className="col-md-6">
              <label htmlFor=" amount">Amount *</label>
              <input
                type="text"
                name="amount"
                value={amount}
                placeholder=" amount"
                className="d-block w-100 p-2"
                onChange={handleChangeInput}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor=" creator_address">Creator_Address</label>
              <input
                type="text"
                name="creator_address"
                value={creator_address}
                placeholder=" creator_address"
                className="d-block w-100 p-2"
                onChange={handleChangeInput}
              />
            </div>

            <div className="col-md-6">
              <label htmlFor=" full_name">Full_Name *</label>
              <input
                type="text"
                name="full_name"
                value={full_name}
                placeholder=" full_name"
                className="d-block w-100 p-2"
                onChange={handleChangeInput}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor=" full_name">Email *</label>
              <input
                type="email"
                name="email"
                value={email}
                placeholder=" email"
                className="d-block w-100 p-2"
                onChange={handleChangeInput}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="phone_number">Phone Number</label>
              <input
                type="text"
                name="phone_number"
                value={phone_number}
                placeholder=" phone_number"
                className="d-block w-100 p-2"
                onChange={handleChangeInput}
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="linkedin_lin">Linkedin *</label>
              <input
                type="text"
                name="linkedin_link"
                value={linkedin_link}
                placeholder=" linkedin_link"
                className="d-block w-100 p-2"
                onChange={handleChangeInput}
              />
            </div>
            <div className="col-12">
              <label htmlFor="telegram">Telegram *</label>
              <input
                type="text"
                name="telegram"
                value={telegram}
                placeholder=" telegram"
                className="d-block w-100 p-2"
                onChange={handleChangeInput}
              />
            </div>
          </div>
          <label htmlFor="short_description">Short_Description *</label>

          <textarea
            name="short_description"
            id="short_description"
            cols="30"
            rows="4"
            placeholder="short_description"
            onChange={handleChangeInput}
            className="d-block my-4 w-100 p-2"
            value={short_description}
          />
          <label htmlFor="long_description">Long_Description *</label>
          <textarea
            name="long_description"
            id="long_description"
            cols="30"
            rows="6"
            placeholder="long_description"
            onChange={handleChangeInput}
            className="d-block my-4 w-100 p-2"
            value={long_description}
          />

          <div className="input-group mb-3">
          <label htmlFor="long_description">Upload Image *</label>

            <div className="input-group-prepend">
              <span className="input-group-text">Upload</span>
            </div>
            <div className="custom-file border rounded">
              <input
                type="file"
                className="custom-file-input"
                onChange={handleUploadInput}
                multiple
                accept="image/*"
              />
            </div>
          </div>

          <div className="row img-up mx-0">
            {images.map((img, index) => (
              <div key={index} className="file_img my-1">
                <img
                  src={img.url ? img.url : URL.createObjectURL(img)}
                  alt=""
                  className="img-thumbnail rounded"
            />
                <span onClick={() => deleteImage(index)}>X</span>
              </div>
            ))}
          </div>

          <button type="submit" className="btn btn-info my-2 px-4">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompaingsManager;
