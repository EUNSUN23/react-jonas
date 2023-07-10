import supabase from "./supabase.js";

export async function getCabins() {
    const {data, error} = await supabase
        .from('cabins')
        .select('*');

    if (error) {
        console.error(error);
        throw new Error('Cabins could not be loaded');
    }

    return data;
}

export async function createCabin(newCabin) {
    const {data, error} = await supabase
        .from('cabins')
        .insert([newCabin]); // newCabin의 데이터 name과 db칼럼명이 같아야 이렇게 쓸 수 있음.

    if (error) {
        console.error(error);
        throw new Error('Cabin could not be created');
    }

}

export async function deleteCabin(id) {

    const {error} = await supabase
        .from('cabins')
        .delete()
        .eq('id', id);

    if (error) {
        console.error(error);
        throw new Error('Cabin could not be deleted');
    }


}