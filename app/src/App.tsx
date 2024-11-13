import React, { useEffect, useState } from "react";
import DataGrid from "./components/DataGrid";

const apiUrl = import.meta.env.VITE_API_URL;

export interface iStuff {
  id: number;
  stuff: string;
  date_created: Date;
  date_updated: Date | null;
  date_deleted: Date | null;
}

function App() {
  const [data, setData] = useState<iStuff[] | []>([]);
  const [newStuff, setNewStuff] = useState<string>("");
  const [editStuff, setEditStuff] = useState<string>("");

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

  async function fetchData() {
    try {
      const res = await fetch(apiUrl);
      const data = await res.json();
      setData(data);
    } catch (err) {
      console.error(err);
    }
  }

  const handleNewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewStuff(e.target.value);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditStuff(e.target.value);
  };

  const postData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const stuff = {
      stuff: newStuff,
    };
    try {
      await fetch(apiUrl, {
        method: "POST", // Method type
        headers: {
          "Content-Type": "application/json", // Content type for JSON payload
        },
        body: JSON.stringify(stuff),
      });
      await fetchData();
      if (document) {
        (document.getElementById("add-modal") as HTMLFormElement).close();
      }
      setNewStuff("");
    } catch (err) {
      console.error(err);
    }
  };

  const putData = async () => {};

  const deleteData = async (id: number) => {
    try {
      const response = await fetch(`${apiUrl}?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log(`Data with ID ${id} was successfully deleted.`);
        if (document) {
          (
            document.getElementById(`delete-modal-${id}`) as HTMLFormElement
          ).close();
        }
        await fetchData(); // Refetch data after deletion
      } else {
        console.error("Failed to delete the data.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-[90%] my-3">
        <button
          className="btn btn-neutral shadow-2xl mb-3 ml-auto"
          onClick={() => {
            if (document) {
              (
                document.getElementById("add-modal") as HTMLFormElement
              ).showModal();
            }
          }}
        >
          New Stuff
        </button>
        <dialog id="add-modal" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-3">Add new stuff!</h3>
            <form
              className="flex flex-col items-start gap-3"
              onSubmit={postData}
            >
              <input
                type="text"
                placeholder="new stuff text here..."
                className="input input-bordered w-full max-w-xs"
                value={newStuff}
                onChange={handleNewChange}
              />
              <button className="btn btn-primary" type="submit">
                Add
              </button>
            </form>
            <p className="py-4 mt-3">Press ESC key or click outside to close</p>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
        <div className="overflow-x-auto shadow-2xl rounded-lg">
          {data.length > 0 && (
            <DataGrid
              stuff={data}
              editStuff={editStuff}
              handleEditChange={handleEditChange}
              setEditStuff={setEditStuff}
              deleteStuff={deleteData}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
