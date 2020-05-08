import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import api from '../axios';
import {Asset} from "@/js/Asset";

import {RootState} from "@/store/types";
import AddressDict from '@/known_addresses';

import Platform from './modules/platform/platform';

export default new Vuex.Store({
    modules: {
        Platform
    },
    state: {
        assets: {},
        known_addresses: AddressDict,
        chainId: 'X',
    },
    getters: {
        assetsArray(store: RootState){
            let res = [];
            for(let i in store.assets){
                res.push(store.assets[i]);
            }
            return res;
        }
    },
    mutations: {

    },
    actions: {
        init(store){

            console.log(AddressDict);
            api.get('/x/assets').then( res => {

                let assets = res.data.assets;
                assets.forEach( (assetData: any) => {
                    let asset = new Asset(assetData);
                    Vue.set(store.state.assets,asset.id,asset);
                });
            })
        }
    },
})
