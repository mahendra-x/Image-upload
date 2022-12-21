import { useEffect, useState } from "react";
import "./App.css";
import Axios from "axios";
import FileUpload from "./component/FileUpload";
function App() {
  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      // console.log(response.data)
      setMovieList(response.data);
    });
  });

  const submitReview = () => {
    Axios.post("http://localhost:3001/api/insert", {
      movieName: movieName,
      movieReview: review,
    });

    setMovieList([...movieList, { movieName: movieName, movieReview: review }]);
  };

  const deleteReview = (movie) => {
    Axios.delete(`http://localhost:3001/api/delete/${movie}`);
  };

  const updateReview = async (movie) => {
    await Axios.put(`http://localhost:3001/api/update`, {
      movieName: movie,
      movieReview: newReview,
    });
    setNewReview("");
  };

  return (
    <div className="App">
      <FileUpload/>
      {/* <h1>Crud Application</h1>
      <div className="form">
        <label>Movie Name</label>
        <input
          type="text"
          name="movieName"
          onChange={(e) => {
            setMovieName(e.target.value);
          }}
        />
        <label>Review</label>

        <input
          type="text"
          name="review"
          onChange={(e) => {
            setReview(e.target.value);
          }}
        />

        <button onClick={submitReview}>Submit</button>

        {movieList.map((d, i) => {
          return (
            <div className="card">
              <h1 key={i}>{d.movieName}</h1>
              <p>{d.movieReview}</p>

              <button
                onClick={() => {
                  deleteReview(d.movieName);
                }}
              >
                Delete
              </button>
              <input
                type="text"
                name="newreview"
                id="updateInput"
                onChange={(e) => setNewReview(e.target.value)}
              />
              <button
                onClick={() => {
                  updateReview(d.movieName);
                }}
              >
                Update
              </button>
            </div>
          );
        })}
      </div> */}
    </div>
  );
}

export default App;
