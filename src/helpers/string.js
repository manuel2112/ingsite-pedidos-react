import { boolNameArticulo } from "./";

export const nameArticle = (family = '', article = '') => {
    
    return boolNameArticulo ? `${family} - ${article}` : article ;
    
}