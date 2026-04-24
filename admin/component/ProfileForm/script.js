var templateFile = await fetch(new URL("./template.html", import.meta.url));
var template = await templateFile.text();

var ProfileForm = {};

ProfileForm.format = function () {
  return template;
};

export { ProfileForm };
