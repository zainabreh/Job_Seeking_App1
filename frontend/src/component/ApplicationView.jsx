import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useGetSingleApplicationQuery } from "../../Redux/auth/application.api";

const ApplicationView = () => {
  const { id } = useParams();
  const { data, refetch } = useGetSingleApplicationQuery(id);

  useEffect(() => {
    if (data && data) {
      refetch();
    }
  }, [data]);

  const [preview, setPreview] = useState(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div class="container" style={{ color: "white" }}>
        <div class="row">
          <div class="col-md-12">
            <h1>Application Details</h1>
            <hr />
          </div>
        </div>
        <div class="row flex" style={{ padding: "10px" }}>
          <div class="col-md-6">
            <ul>
              {
                <>
                  <li>
                    <strong
                      style={{ textDecoration: "underline", color: "#000080" }}
                    >
                      Name:
                    </strong>{" "}
                    <p>{data && data.applications.position}</p>
                  </li>
                  <li>
                    <strong
                      style={{ textDecoration: "underline", color: "#000080" }}
                    >
                      Email:
                    </strong>{" "}
                    <p>{data && data.applications.companyEmail}</p>
                  </li>
                  <li>
                    <strong
                      style={{ textDecoration: "underline", color: "#000080" }}
                    >
                      Phone:
                    </strong>{" "}
                    <p>{data && data.applications.phone}</p>
                  </li>
                  <li>
                    <strong
                      style={{ textDecoration: "underline", color: "#000080" }}
                    >
                      Status:
                    </strong>{" "}
                    <p>{data && data.applications.status}</p>
                  </li>
                  <li>
                    <strong
                      style={{ textDecoration: "underline", color: "#000080" }}
                    >
                      Cover Letter:
                    </strong>{" "}
                    <p>{data && data.applications.coverLetter}</p>
                  </li>
                </>
              }
            </ul>
          </div>
          <div className="col-md-6" style={{ textAlign: "end" }}>
            <img
              style={{ objectFit: "cover", cursor: "pointer" }}
              src={preview ? preview : `${data && data.applications.resume}`}
              width={60}
              alt="Resume Preview"
              onClick={handleImageClick}
            />
          </div>
          {isModalOpen && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000,
              }}
            >
              <div style={{ position: "relative" }}>
                <img
                  src={
                    preview ? preview : `${data && data.applications.resume}`
                  }
                  alt="Resume Full View"
                  style={{
                    maxWidth: "55%",
                    maxHeight: "100%",
                    // objectFit: "contain",
                  }}
                />
                <CloseRoundedIcon
                  color="warning"
                  onClick={handleCloseModal}
                  style={{
                    position: "absolute",
                    width:"50px",
                    height:"50px",
                    top: "-20px",
                    right: "-20px",
                    cursor: "pointer",
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ApplicationView;
