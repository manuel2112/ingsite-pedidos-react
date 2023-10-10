import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isShowMdlArticle: false,
        isShowMdlArticleBox: false,
        isShowMdlArticleDetailsInsert: false,
        isShowMdlArticleDetailsUpdate: false,
        isShowMdlFamilyBox: false,
    },
    reducers: {
        onShowMdlArticle: ( state ) => {
            state.isShowMdlArticle = true;
        },
        onHiddeMdlArticle: ( state ) => {
            state.isShowMdlArticle = false;
        },
        onShowMdlArticleDetailsInsert: ( state ) => {
            state.isShowMdlArticleDetailsInsert = true;
        },
        onHiddeMdlArticleDetailsInsert: ( state ) => {
            state.isShowMdlArticleDetailsInsert = false;
        },
        onShowMdlArticleDetailsUpdate: ( state ) => {
            state.isShowMdlArticleDetailsUpdate = true;
        },
        onHiddeMdlArticleDetailsUpdate: ( state ) => {
            state.isShowMdlArticleDetailsUpdate = false;
        },
        onShowMdlArticleBox: ( state ) => {
            state.isShowMdlArticleBox = true;
            state.isShowMdlFamilyBox = false;
        },
        onShowMdlFamilyBox: ( state ) => {
            state.isShowMdlArticleBox = false;
            state.isShowMdlFamilyBox = true;
        },
        onResetMdlBox: ( state ) => {
            state.isShowMdlArticleBox = false;
            state.isShowMdlFamilyBox = false;
        },
    }
});

export const {
    onResetMdlBox,
    onShowMdlArticle, 
    onHiddeMdlArticle,
    onShowMdlArticleBox, 
    onShowMdlFamilyBox,
    onShowMdlArticleDetailsInsert,
    onHiddeMdlArticleDetailsInsert,
    onShowMdlArticleDetailsUpdate,
    onHiddeMdlArticleDetailsUpdate
} = uiSlice.actions;