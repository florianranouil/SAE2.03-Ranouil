var DataProfile = {};

DataProfile.add = function (formData) {
  return fetch("../../server/script.php?todo=addprofile", {
    method: "POST",
    body: formData
  }).then(function(response) {
    return response.json();
  }).catch(function(error) {
    return { error: error.message };
  });
};

export { DataProfile };
