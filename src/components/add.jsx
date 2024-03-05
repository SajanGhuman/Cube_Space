import { useEffect, useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import ErrorBoundary from "./errorBoundary";

const ADD = () => {
  const navget = useNavigate();
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [categories, setCategories] = useState([]);
  const [uploadImage, setUploadImage] = useState(false);

  const [form, setForm] = useState({
    name: "",
    notation: "",
    type: "",
    file: "",
  });

  const handleChange = (event, type) => {
    try {
      switch (type) {
        case "name":
          setError("");
          // const data = editor.getData();
          // console.log(data);
          setForm({ ...form, name: event.target.value });
          console.log({ ...form, name: event.target.value });
          if (event.target.value === "") {
            setError("Name Is Empty");
          }
          break;
        case "notation":
          setError("");
          setForm({ ...form, notation: event.target.value });
          console.log({ ...form, notation: event.target.value });
          if (event.target.value === "") {
            setError("Notation Is Empty");
          }
          break;
        case "type":
          console.log("Before updating type state:", form);
          setError("");
          setForm({ ...form, type: event.target.value });
          console.log("After updating type state:", form);
          if (event.target.value === "") {
            setError("Type Is Empty");
          }
          break;
        case "file":
          console.log("Before updating file state:", form);
          setError("");
          setForm({ ...form, file: event.target.files[0] });
          console.log("After updating file state:", form);
          break;
      }
    } catch (error) {
      console.error("Error in handleChange:", error);
    }
  };

  useEffect(() => {
    try {
      {
        fetch(`/back-end/getCategories.php`)
          .then((res) => {
            console.log(res);
            return res.json();
          })
          .then((res) => {
            console.log(res);
            if (res.error === true) {
              console.log("Error occured");
            } else {
              console.log(res.result);
              setCategories(res.result || []);
            }
          })
          .catch((err) => {
            console.log("Error:", err);
          });
      }
    } catch (error) {
      console.error("Error in UseEffect:", error);
    }
  }, []);

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("notation", form.notation);
      formData.append("type", form.type);

      formData.append("file", form.file);
      if (form.name !== "" && form.notation !== "" && form.type !== "") {
        fetch("/back-end/add.php", {
          method: "POST",
          body: formData,
        })
          .then((res) => {
            console.log(res);
            return res.json();
          })
          .then((res) => {
            console.log(res);
            if (res.error === true) {
              setError(res.result);
            } else {
              setMsg("Algorithm Added successfully!! Redirecting...");
              setTimeout(() => {
                navget("/");
              }, 3000);
            }
          })
          .catch((err) => {
            setError(`Could not add image becuase -> Error:${err}`);
            console.log("Could not add image becuase -> Error:", err);
          });
      } else {
        e.preventDefault();
        setError("All field are required");
      }
    } catch (error) {
      console.error("Error in handleChange:", error);
    }
  };

  return (
    <ErrorBoundary>
      <div className="add__div__main">
        <div className="add__msg__div">
          {msg !== "" ? (
            <p className="add__success">{msg.toString()}</p>
          ) : (
            <p className="add__error">{error.toString()}</p>
          )}
        </div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <ul className="add__ul">
            <li>
              <label htmlFor="name">Name:</label>
              {/* <CKEditor
                className="ck__editor"
                editor={ClassicEditor}
                name="name"
                data={form.name}
                onChange={(event, editor) =>
                  handleChange(event, "name", editor)
                }
              /> */}
              <input
                type="text"
                name="name"
                value={form.name}
                placeholder="Enter alg Name"
                onChange={(e) => handleChange(e, "name")}
              />
            </li>
            <li>
              <label htmlFor="notation">Notation:</label>
              {/* <ReactQuill
                className="quill__content"
                theme="snow"
                name="notation"
                value={form.notation}
                onChange={(v) => handleChange(v, "notation")}
              /> */}
              {/* <CKEditor
                className="ck__editor"
                editor={ClassicEditor}
                name="notation"
                data={form.notation}
                onChange={(event, editor) =>
                  handleChange(event, "notation", editor)
                }
              /> */}
              <input
                type="text"
                name="notation"
                id="notation"
                value={form.notation}
                placeholder="Enter Alg Notation"
                onChange={(e) => handleChange(e, "notation")}
              />
            </li>
            <li>
              <label htmlFor="type">Type:</label>
              <select
                value={form.type}
                name="type"
                id="type"
                onChange={(event) => handleChange(event, "type")}
              >
                <option value="">Choose category</option>
                {categories.map((category) => (
                  <option value={category.categoryName}>
                    {category.categoryName}
                  </option>
                ))}
              </select>
            </li>
            {uploadImage ? (
              <li>
                <label htmlFor="image">Image:</label>
                <input
                  className="image__input"
                  type="file"
                  name="image"
                  id="image"
                  accept="image/*"
                  onChange={(event) => handleChange(event, "file")}
                />
              </li>
            ) : (
              <div
                className="image__button"
                onClick={() => setUploadImage(true)}
              >
                <p>Upload Image</p>
              </div>
            )}
            <button type="submit" className="add__submit">
              Add Algorithm
            </button>
          </ul>
        </form>
      </div>
    </ErrorBoundary>
  );
};

export default ADD;
