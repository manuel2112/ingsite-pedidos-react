import { createSlice } from '@reduxjs/toolkit';

export const articuloSlice = createSlice({
    name: 'articulo',
    initialState: {
        articles: [],
        articleSelect: {},
        articlesTemp: [],
        families: []
    },
    reducers: {
        onArticles: ( state, {payload} ) => {
            state.articles  = payload.articulos;
            state.families  = payload.familias;
        },
        onGetArticles: ( state, {payload} ) => {
            state.articlesTemp  = state.articles.filter( article => {
                if( !payload.includes(article.articulos_id) ){                   
                    return article;
                }
            });
        },
        onResetArticlesTemp: ( state ) => {
            state.articlesTemp  = [];
        },
        onResetArticles: ( state ) => {
            state.articles  = [];
            state.families  = [];
        },
        onArticleSelect: ( state, {payload} ) => {
            state.articleSelect = payload;
        },
        onArticleReset: ( state ) => {
            state.articleSelect = {};
        },
        onSearchArticle: ( state, {payload} ) => {
            state.articlesTemp = state.articles.filter( article => {
                if(article.articulos_descripcion.includes(payload.term) && !payload.arr.includes(article.articulos_id)){
                    return article
                }
            })
        },
        onSearchArticleByFamily: ( state, {payload} ) => {
            state.articlesTemp = state.articles.filter( article => {
                if(article.articulos_familia_id === payload.id && !payload.arr.includes(article.articulos_id) ){
                    return article;
                }
            })
        },
    }
});

export const { 
    onArticles,
    onGetArticles,
    onResetArticles,
    onResetArticlesTemp,
    onSearchArticle,
    onSearchArticleByFamily,
    onArticleSelect,
    onArticleReset,
} = articuloSlice.actions;