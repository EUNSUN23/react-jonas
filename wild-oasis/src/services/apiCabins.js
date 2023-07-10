import supabase, {supabaseUrl} from "./supabase.js";

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

export async function createEditCabin(newCabin, id) {
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl); // 이전 이미지 - true / 새 이미지 - false

    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", ""); // 특수문자 /에 대해서 supabase가 새로운 디렉토리를 생성하기 때문에 지워준다.
    const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    // 1. Create/edit cabin
    let query = supabase.from('cabins');

    // A) CREATE
    if(!id) query = query.insert([{...newCabin, image: imagePath}])

    // B) EDIT
    if(id) query = query.update({...newCabin, image: imagePath}).eq('id', id)

    const {data, error} = await query.select().single();

    if (error) {
        console.error(error);
        throw new Error('Cabin could not be created');
    }

    // 2. Upload image
    const {error:storageError} = await supabase.storage
        .from('cabin-images')
        .upload(imageName, newCabin.image);

    // 3. Delete the cabin IF there was an error uploading image
    if (storageError) {
        await supabase
            .from('cabins')
            .delete()
            .eq('id', data.id);

        console.error(error);
        throw new Error('Cabin image could not be loaded and the cabin was not created');
    }

    return data; // create/edit한 데이터 반환
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