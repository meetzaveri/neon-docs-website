const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const DRAFT_FILTER = IS_PRODUCTION && process.env.BRANCH === 'main' ? [false] : [true, false];

const POST_REQUIRED_FIELDS = ['title', 'description', 'author'];
const STATIC_PAGE_REQUIRED_FIELDS = ['title'];
const DOC_REQUIRED_FIELDS = ['title'];
const RELEASE_NOTES_REQUIRED_FIELDS = ['label'];

module.exports = {
  IS_PRODUCTION,
  DRAFT_FILTER,
  POST_REQUIRED_FIELDS,
  STATIC_PAGE_REQUIRED_FIELDS,
  DOC_REQUIRED_FIELDS,
  RELEASE_NOTES_REQUIRED_FIELDS,
};
