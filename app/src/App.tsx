import React, { useEffect, useState } from "react";
import "./App.css";

const apiUrl = import.meta.env.VITE_API_URL;

interface iStuff {
  id: number;
  stuff: string;
  date_created: Date;
  date_updated: Date | null;
  date_deleted: Date | null;
}

function App() {
  const [data, setData] = useState<iStuff[] | []>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        setData(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, []);

  const DataGrid: React.FC<{ stuff: iStuff[] }> = ({ stuff }) => {
    return (
      <table className="table">
        <thead className="bg-base-200">
          <tr>
            <th>id</th>
            <th>Name</th>
            <th className="w-1/12"></th>
            <th className="w-1/12"></th>
          </tr>
        </thead>
        <tbody>
          {stuff.map((thing: iStuff) => (
            <tr
              key={thing.id}
              className={`${thing.id % 2 === 0 && "bg-base-200"}`}
            >
              <td>{thing.id}</td>
              <td>{thing.stuff}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    if (document) {
                      (
                        document.getElementById("my_modal_1") as HTMLFormElement
                      ).showModal();
                    }
                  }}
                >
                  edit
                </button>
                <dialog id="my_modal_1" className="modal">
                  <div className="modal-box">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">
                      Press ESC key or click the button below to close
                    </p>
                    <div className="modal-action">
                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn">Close</button>
                      </form>
                    </div>
                  </div>
                </dialog>
              </td>
              <td>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    console.log("hi");
                  }}
                >
                  delete
                </button>
                <dialog id="my_modal_2" className="modal">
                  <div className="modal-box">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">
                      Press ESC key or click the button below to close
                    </p>
                    <div className="modal-action">
                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn">Close</button>
                      </form>
                    </div>
                  </div>
                </dialog>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="m-4 bg-red-400">
      <button
        className="btn ml-4"
        onClick={() => {
          if (document) {
            (
              document.getElementById("my_modal_3") as HTMLFormElement
            ).showModal();
          }
        }}
      >
        New Stuff
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click outside to close</p>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      <div className="m-4 overflow-x-auto border border-black rounded-lg bg-gray-50">
        {data.length > 0 && <DataGrid stuff={data} />}
      </div>
    </div>
  );
}

export default App;
