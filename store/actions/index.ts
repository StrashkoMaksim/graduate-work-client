import * as UserActionCreators from './user'
import * as ArticlesCategoriesActionCreators from './articles-categories'
import * as LoadingActionCreators from './loading'
import * as CartActionCreators from './cart'
import * as CallbackActionCreators from './callback'
import * as QuestionActionCreators from './question'
import * as CatalogCategoriesActionCreators from './catalog-categories'
import * as ServiceActionCreators from './service'
import * as ReviewActionCreators from './review'
import * as SourceActionCreators from './source'
import * as StatusActionCreators from './status'

export default {
    ...UserActionCreators,
    ...ArticlesCategoriesActionCreators,
    ...LoadingActionCreators,
    ...CartActionCreators,
    ...CallbackActionCreators,
    ...QuestionActionCreators,
    ...CatalogCategoriesActionCreators,
    ...ServiceActionCreators,
    ...ReviewActionCreators,
    ...SourceActionCreators,
    ...StatusActionCreators,
}