import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserInfo } from "../../../redux/adminUsersSlice";
import OwnerInfo from "../OwnerInfo/OwnerInfo.jsx";
import axios from "axios";

const UserProfile = () => {
  const { id, role } = useParams();
  const userInfo = useSelector((state) => state.adminUsers.userInfo);
  const [editDisable, setEditDisable]= useState(true)
  const dispatch = useDispatch();
//Obtenemos la información del usuario
  useEffect(()=>{
      dispatch(getUserInfo(id,role))
  },[])
//Función de habilita o deshabilita la edición de la información del usuario
  const handleEdit= ()=> {
    setEditDisable(!editDisable);
  };
//Función de maneja el borrado lógico (suspension de la cuenta)
  const handleDelete= async ()=>{
    try {
      let deleteUrl;
      if (role === "Owner") {
        deleteUrl = `http://localhost:3000/owners/delete/${userInfo.id}`;
      } else if (role === "DogSitter") {
        deleteUrl = `http://localhost:3000/sitters/delete/${userInfo.id}`;
      } else {
        console.error("Rol de usuario no válido:", role);
        return;
      }
      if(userInfo.deleted){
        await axios.put(deleteUrl, { deleted: false });
      } else {
        await axios.put(deleteUrl, { deleted: true });
      }
      dispatch(getUserInfo(id, role));
    } catch (error) {
      console.error("Error al procesar la solicitud de borrado lógico:", error);
    }
  }
  //Función para manejar el envió del formulario
  const handleFormSubmit = async (values, dispatch, resetForm) => {
    try {
      let updateUrl;
      if (role === "Owner") {
        updateUrl = `http://localhost:3000/owners/${userInfo.id}`;
      } else if (role === "DogSitter") {
        updateUrl = `http://localhost:3000/sitters/${userInfo.id}`;
      } else {
        console.error("Rol de usuario no válido:", role);
        return;
      }
      await axios.put(updateUrl,values);
      dispatch(getUserInfo(userInfo.id, role));
      setEditDisable(!editDisable);
      resetForm();
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };
  return (
    <div>
      {userInfo.deleted ? (
        <div>
          <p>Cuenta Suspendida.-</p>{" "}
          <button onClick={() => handleDelete()}>Activar</button>
        </div>
      ) : (
        <div>
          <p>Cuenta Activa.-</p>
          <button onClick={() => handleDelete()}>Suspender</button>
        </div>
      )}
      {role === "Owner" ? (
        <div>
          <button onClick={() => handleEdit()}>Editar</button>
          <OwnerInfo userInfo={userInfo} editDisable={editDisable} handleFormSubmit={handleFormSubmit}/>
        </div>
      ) : (
        <div>
          <h1>Sitter profile</h1>
        </div>
      )}
    </div>
  );
}

export default UserProfile;