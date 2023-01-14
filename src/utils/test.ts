const { Configuration, OpenAIApi } = require("openai");

export const test = () => {

  const configuration = new Configuration({
    apiKey: '',
  });
  const openai = new OpenAIApi(configuration);

  async function get_resp(txt: any, to: any) {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `translate "${txt}" to "${to}" be extremely thorough`,
      temperature: 1,
      max_tokens: 150,
    });
    console.log(response);
    return response;
  }


  function getTextNodesIn(elem: any, opt_fnFilter: any) {
    var textNodes: any[] = [];
    if (elem) {
      for (var nodes = elem.childNodes, i = nodes.length; i--;) {
        var node = nodes[i], nodeType = node.nodeType;
        if (nodeType == 3) {
          if (!opt_fnFilter || opt_fnFilter(node, elem)) {
            textNodes.push(node);
          }
        }
        else if (nodeType == 1 || nodeType == 9 || nodeType == 11) {
          textNodes = textNodes.concat(getTextNodesIn(node, opt_fnFilter));
        }
      }
    }
    return textNodes;
  }


  var menu = document.body;
  // var items = getTextNodesIn(element);

  getTextNodesIn(menu, function (textNode: any, parent: any) {
    if (/^\s+$/.test(textNode.nodeValue)) {
      parent.removeChild(textNode);
    }
  });

  var items = getTextNodesIn(menu, false)
  items = items.filter(u => u.textContent.length > 50 && !u.textContent.includes("{"));
  items = items.reverse();

  // var regex = new RegExp('\n|\s')
  // var regex2 = new RegExp(/\s/g)
  // items = items.filter(u => !regex.test(u.textContent) && !regex2.test(u.textContent))

  // items = document.getElementsByTagName('p');

  const translateParagraphs = async () => {

    for (var i = 0; i < items.length; i++) {

      const response = await get_resp(items[i].textContent, `${localStorage.getItem("translate_type")} speak`);
      items[i].textContent = response.data.choices[0].text;
      console.log(items[i].textContent)

    }
  };
  translateParagraphs();
};

