'use server';

import { updateTag } from "next/cache";



export async function revalidateExampleAction(formData: FormData) {
  const path = formData.get('path') || '';
  // console.log(`Revalidating path: ${path}`);
  // console.log('Server action');

  // revalidatePath(path.toString());

  updateTag('posts');
}
