import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Button, Modal, Table } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { Bell } from "lucide-react";

const DashUsers = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [newUsers, setNewUsers] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const prevUserCountRef = useRef(0);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`/backend/user/getusers`);
      const data = await res.json();

      if (res.ok) {
        if (
          currentUser.isAdmin &&
          data.users.length > prevUserCountRef.current
        ) {
          const addedUsers = data.users.slice(prevUserCountRef.current);
          setNewUsers((prev) => [...prev, ...addedUsers]);
          toast.info("🆕 Nouveau membre ajouté !");
        }

        prevUserCountRef.current = data.users.length;
        setUsers(data.users);
        setShowMore(data.users.length >= 9);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(`/backend/user/getusers?startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) setShowMore(false);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`/backend/user/delete/${userIdToDelete}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
        toast.success("✅ Utilisateur supprimé !");
        setShowModal(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("❌ Erreur lors de la suppression.");
    }
  };

  const handleMakeAdmin = async (userId) => {
    try {
      const res = await fetch(`/backend/user/makeadmin/${userId}`, {
        method: "PUT",
      });
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) =>
          prev.map((user) =>
            user._id === userId ? { ...user, isAdmin: true } : user
          )
        );
        toast.success("✅ Admin ajouté !");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("❌ Erreur lors du changement de rôle.");
    }
  };

  const handleRemoveAdmin = async (userId) => {
    try {
      const res = await fetch(`/backend/user/removeadmin/${userId}`, {
        method: "PUT",
      });
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) =>
          prev.map((user) =>
            user._id === userId ? { ...user, isAdmin: false } : user
          )
        );
        toast.success("✅ Admin retiré.");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("❌ Erreur lors du retrait.");
    }
  };

  const handleToggleVerify = async (userId) => {
    try {
      const res = await fetch(`/backend/user/verify/${userId}`, {
        method: "PUT",
      });
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) =>
          prev.map((user) =>
            user._id === userId
              ? { ...user, isverifyed: !user.isverifyed }
              : user
          )
        );
        // Remove from new users if verified
        setNewUsers((prev) => prev.filter((user) => user._id !== userId));
        toast.success("✅ Statut de vérification mis à jour.");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("❌ Erreur lors de la mise à jour.");
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 relative">
      {/* Notification Icon */}
      <div className="absolute top-4 right-4 z-10 ">
        <div className="relative">
          <Bell
            onClick={() => setShowNotifications((prev) => !prev)}
            className="cursor-pointer text-gray-700 dark:text-white"
          />
          {newUsers.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs">
              {newUsers.length}
            </span>
          )}
        </div>
        {showNotifications && (
          <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 max-h-96 overflow-y-auto">
            <h3 className="text-lg font-semibold mb-2">Nouveaux membres</h3>
            {newUsers.length === 0 ? (
              <p className="text-sm text-gray-500">Aucun nouveau membre</p>
            ) : (
              newUsers.map((user) => (
                <div key={user._id} className="mb-3 border-b pb-2">
                  <p className="text-sm font-medium">{user.username}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                  <p className="text-sm text-gray-400">
                    Inscrit le {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-sm">
                      Statut:{" "}
                      {user.isverifyed ? (
                        <FaCheck className="inline text-green-500" />
                      ) : (
                        <FaTimes className="inline text-red-500" />
                      )}
                    </p>
                    {!user.isverifyed && (
                      <button
                        onClick={() => handleToggleVerify(user._id)}
                        className="text-blue-500 text-sm hover:underline"
                      >
                        Accepter
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Search bar */}
      <div className="mb-4 mt-8">
        <input
          type="text"
          placeholder="Recherche par nom ou email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded w-full"
        />
      </div>

      {/* User Table */}
      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date</Table.HeadCell>
              <Table.HeadCell>Image</Table.HeadCell>
              <Table.HeadCell>Nom</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Admin</Table.HeadCell>
              <Table.HeadCell>Changer rôle</Table.HeadCell>
              <Table.HeadCell>Vérifié</Table.HeadCell>
              <Table.HeadCell>Changer statut</Table.HeadCell>
              <Table.HeadCell>Supprimer</Table.HeadCell>
            </Table.Head>
            {filteredUsers.map((user) => (
              <Table.Body key={user._id} className="divide-y">
                <Table.Row className="bg-white dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <img
                      src={user.profilePicture}
                      alt={user.username}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </Table.Cell>
                  <Table.Cell>{user.username}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>
                    {user.isAdmin ? (
                      <FaCheck className="text-green-500" />
                    ) : (
                      <FaTimes className="text-red-500" />
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {user.isAdmin ? (
                      <span
                        className="text-orange-500 cursor-pointer hover:underline"
                        onClick={() => handleRemoveAdmin(user._id)}
                      >
                        Retirer Admin
                      </span>
                    ) : (
                      <span
                        className="text-blue-500 cursor-pointer hover:underline"
                        onClick={() => handleMakeAdmin(user._id)}
                      >
                        Rendre Admin
                      </span>
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {user.isverifyed ? (
                      <FaCheck className="text-green-500" />
                    ) : (
                      <FaTimes className="text-red-500" />
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => handleToggleVerify(user._id)}
                      className="text-indigo-500 cursor-pointer hover:underline"
                    >
                      {user.isverifyed ? "Refuser" : "Accepter"}
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setUserIdToDelete(user._id);
                        setShowModal(true);
                      }}
                      className="text-red-500 cursor-pointer hover:underline"
                    >
                      Supprimer
                    </span>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>

          {filteredUsers.length === 0 && (
            <p className="text-center mt-4">Aucun utilisateur trouvé.</p>
          )}

          {showMore && (
            <button
              onClick={handleShowMore}
              className="text-teal-500 text-sm w-full py-4"
            >
              Afficher plus
            </button>
          )}
        </>
      ) : (
        <p className="text-center">Aucun utilisateur à afficher.</p>
      )}

      {/* Modal de suppression */}
      <Modal show={showModal} onClose={() => setShowModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="w-14 h-14 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg text-gray-500 mb-5">
              Es-tu sûr de vouloir supprimer cet utilisateur ?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteUser}>
                Oui, supprimer
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                Annuler
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DashUsers;
