import { API_ROOT } from '../../api-config';

export const FETCH_MENU = 'FETCH_MENU';
export const FETCH_MENU_SUCCESS = 'FETCH_MENU_SUCCESS';
export const FETCH_MENU_FAILURE = 'FETCH_MENU_FAILURE';

export function fetchMenu(restaurantId) {

    console.log('restarantid', restaurantId);
    return (dispatch) => {
       
        dispatch(getMenu());
        return(fetch(`${API_ROOT}/getMenu?rid=`+restaurantId))
        .then(res => res.json())
        .then(data => {
            console.log("data==================", data);
            result = data.reduce(function (r, a) {
            r[a.dish_category] = r[a.dish_category] || [];
            r[a.dish_category].push(a);
            return r;
        }, Object.create(null));
        //console.log("resulttttttttttttttttttttttttttttttt", result);
        
        var ja = [];
        for( item in result) {
            ja.push({
                "category": item,
                "dishes": result[item]
            }) 
        }
        //console.log("jaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", ja);
        //this.setState({ categorizedMenu: ja});
            
            dispatch(fetchMenuSuccess(ja));
            //console.log(json,"jsonnnnnnnnnnnnnn");

            return ja;
        })  
        .catch(err => dispatch(fetchMenuFailure(err)))
    }
}
 
export function getMenu() {
    return {
        type: FETCH_MENU
    }
}

export function fetchMenuSuccess(menu) {
    return {
        type: FETCH_MENU_SUCCESS,
        payload: {menu} 
    };
}

export function fetchMenuFailure(error) {
    return {
        type: FETCH_MENU_FAILURE,
        payload: {error} 
    };
}