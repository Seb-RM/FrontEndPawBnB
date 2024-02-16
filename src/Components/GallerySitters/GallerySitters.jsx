import { Formik, Form } from "formik";
import styles from "./GallerySitters.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sitterInfo } from "../../redux/sitterSlice";

const GallerySitters = () => {
  //const { id } = useParams();

  const dispatch = useDispatch();
  const { id } = useParams();
  const infoSitter = useSelector((state) => state.sitter);

  const [file, setFile] = useState(null);
  const [imgGallery, setImgGallery] = useState(null);

  const currentSitter = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3000/sitters/${id}`);
      dispatch(sitterInfo(data));
    } catch (error) {
      console.error("Error al obtener los datos del cuidador:", error);
    }
  };

  const previewFiles = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgGallery(reader.result);
    };
  };

  const handleChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    previewFiles(file);
  };

  const handleFormSubmit = async () => {
    try {
      const result = await axios.put(`http://localhost:3000/sitters/${id}`, {
        photos: imgGallery,
      });
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePhoto = async (index) => {
    try {
      await axios.delete(`http://localhost:3000/sitters/${id}/photos/${index}`);
      currentSitter(); //actualizamos la galeria despues de la eliminacion
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    currentSitter();
  }, [dispatch]);

  return (
    <div className={styles.galleryContainer}>
      <div className={styles.tituloContainer}>
        <h1 className={styles.titulo}>MI GALERIA</h1>
      </div>

      <div className={styles.formContainer}>
        <div>
          <div className={styles.iconContainer}>
            <i className="bi bi-cloud-upload"></i>
          </div>

          <div className={styles.uploadContainer}>
            <Formik
              initialValues={{
                photos: infoSitter?.photos || [],
              }}
              onSubmit={async (values) => {
                handleFormSubmit(values, dispatch);
              }}
            >
              {() => (
                <Form>
                  <input
                    className={styles.inputStyle}
                    onChange={handleChange}
                    name="image"
                    type="file"
                    id="fileInput"
                    required
                    accept="image/png, image/jpeg, image/jpg, image/jfif"
                  />
                  <button type="submit" className={styles.btnSubmit}>
                    SUBIR IMAGEN
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>

      <div className={styles.imgsRender}>
        <div className={styles.gallery}>
          <img
            src={imgGallery}
            alt="Aqui Ira Tu Image"
            className={styles.photoContainer}
          />
          {infoSitter.photos?.map((photo, index) => (
            <div key={index} className={styles.photoContainer}>
              <img src={photo.url} alt={`Photo ${index}`} />
              <button
                onClick={() => handleDeletePhoto(index)}
                className={styles.deleteButton}
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GallerySitters;