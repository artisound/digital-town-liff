import pages from '~/assets/json/pages.json';
export default (context, inject) => {
  const pageTitle = () => {

    const fullPath  = context.route.name.split('-')

    let hierarchy = JSON.parse(JSON.stringify(pages))
    for (let i = 0; i < fullPath.length; i++) {
      const name = fullPath[i]
      if(!hierarchy[name]) break;

      if (hierarchy[name].children) {
        const children = hierarchy[name].children
        hierarchy = (fullPath[i + 1] && children[fullPath[i + 1]]) ? children : hierarchy[name]
      } else {
        hierarchy = hierarchy[name]
      }
    }

    return hierarchy.title;
  }
  inject('pageTitle', pageTitle);
  context.$pageTitle = pageTitle;
}