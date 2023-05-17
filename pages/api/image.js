import { get } from "lodash";
import { GetImageFromCode } from "../../services/Badges";

export default async function handler(req, res) {
  const { code } = req.query.code
    ? req.query
    : { code: "" };

  const response = await GetImageFromCode(code).then((request) => {
    if (get(request, 'success', false) === true) {
      return get(request, 'content', "")
    } else {
      return ""
    }
  }).catch(() => { return "" })

  if (response !== "") {
    const otherImage = response.substring(response.indexOf('base64') + 6)
    var img = Buffer.from(otherImage, 'base64');

    res.writeHead(200, {
      'Content-Type': 'image/jpg,',
      'Content-Length': img.length
    });

    res.end(img);
  } else {
    res.writeHead(200, {
      'Content-Type': 'image/jpg,',
      'Content-Length': 0
    });

    res.end(img);
  }
}