// translate router.meta.title, be used in breadcrumb sidebar tagsview
export function generateTitle(title) {
  // const hasKey = $te('route.' + title)
  // const translatedTitle = $t('route.' + title) // $t :this method from vue-i18n, inject in @/lang/index.js

  // if (hasKey) {
  //   return translatedTitle
  // }
  // return title
  return $t('route.' + title)
}
