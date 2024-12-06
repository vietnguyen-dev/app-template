import React from "react";
import { iStuff } from "../App";

interface iDataGridProps {
  stuff: iStuff[];
  editStuff: string;
  setEditStuff: (stuff: string) => void;
  handleEditChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  putData: (e: React.FormEvent<HTMLFormElement>, id: number) => void;
  deleteStuff: (id: number) => void;
}

const DataGrid: React.FC<iDataGridProps> = React.memo(
  ({
    stuff,
    editStuff,
    setEditStuff,
    handleEditChange,
    putData,
    deleteStuff,
  }) => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th className="w-1/12">id</th>
            <th>Stuff</th>
            <th className="w-1/12"></th>
            <th className="w-1/12"></th>
          </tr>
        </thead>
        <tbody>
          {stuff.map((thing: iStuff, index: number) => (
            <tr key={thing.id} className={index % 2 === 0 ? "bg-base-200" : ""}>
              <td>{thing.id}</td>
              <td>{thing.stuff}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setEditStuff(thing.stuff);
                    if (document) {
                      (
                        document.getElementById(
                          `edit-modal-${thing.id}`
                        ) as HTMLFormElement
                      ).showModal();
                    }
                  }}
                >
                  edit
                </button>
                <dialog id={`edit-modal-${thing.id}`} className="modal">
                  <div className="modal-box">
                    <h3 className="font-bold text-lg mb-3">Edit stuff!</h3>
                    <form
                      className="flex flex-col items-start gap-3"
                      onSubmit={(e) => putData(e, thing.id)}
                    >
                      <input
                        type="text"
                        placeholder="edit stuff text here..."
                        className="input input-bordered w-full max-w-xs"
                        value={editStuff}
                        onChange={handleEditChange}
                      />
                      <button className="btn btn-primary">Submit</button>
                    </form>
                    <p className="py-4 mt-3">
                      Press ESC key or click outside to close
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
                    if (document) {
                      (
                        document.getElementById(
                          `delete-modal-${thing.id}`
                        ) as HTMLFormElement
                      ).showModal();
                    }
                  }}
                >
                  delete
                </button>
                <dialog id={`delete-modal-${thing.id}`} className="modal">
                  <div className="modal-box">
                    <h3 className="font-bold text-lg mb-3">
                      Are you sure you want to delete this stuff?
                    </h3>
                    <button
                      className="btn btn-warning mr-6"
                      onClick={() => deleteStuff(thing.id)}
                    >
                      YES
                    </button>
                    <p className="py-4">
                      Press ESC key or click outside to close
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
  }
);

export default DataGrid;
