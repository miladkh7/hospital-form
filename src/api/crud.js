import client from "./client";

const hospitalForms = async (payload) => {
  try {
    const url = `/hospital/`;
    const { data } = await client.post(url, payload, {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
        // ContentType: 'application/json',
      },
    });
    return data;
  } catch (error) {
    console.error("Error in hospitalForms:", error);
  }
};

const hospitalFloors = async (payload, id) => {
  try {
    const url = `/hospital/${id}/submit_floors/`;
    const { data } = await client.post(
      url,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
          // ContentType: 'application/json',
        },
      }
    );
    return data;
  } catch (error) {
    console.error("Error in hospitalFloors:", error);
  }
};

const hospitalClassification = async (payload, id) => {
  try {
    const url = `/hospital/${id}/submit_classification/`;
    const { data } = await client.post(url, payload, {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
        // ContentType: 'application/json',
      },
    });
    return data;
  } catch (error) {
    console.error("Error in submit_classification:", error);
  }
};

const hospitalComponents = async (payload, id) => {
  console.log(id, "hospitalComponentsId");

  try {
    const url = `/hospital/${id}/add_medical_components/`;
    const { data } = await client.post(url, payload, {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
        // ContentType: 'application/json',
      },
    });
    return data;
  } catch (error) {
    console.error("Error in submit_classification:", error);
  }
};

const getGridData = async (id) => {
  try {
    const url = `/calculate/${1}/`;
    const { data } = await client.get(url, {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
        // ContentType: 'application/json',
      },
    });
    return data;
  } catch (error) {
    console.error("Error in getGridData:", error);
  }
}
const getHospital = async () => {
  try {
    const url = `/hospital/`;
    const { data } = await client.get(url, {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
        // ContentType: 'application/json',
      },
    });
    return data;
  } catch (error) {
    console.error("Error in hospitalForms:", error);
  }
};

export {
  hospitalForms,
  hospitalFloors,
  hospitalClassification,
  hospitalComponents,
  getGridData,
  getHospital
};
