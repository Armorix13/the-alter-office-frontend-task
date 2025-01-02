export function timeAgo(createdAt: any) {
  const now: any = new Date();
  const createdAtDate: any = new Date(createdAt);
  const diffInSeconds = Math.floor((now - createdAtDate) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays > 0) {
    return diffInDays === 1 ? "Yesterday" : `${diffInDays} days ago`;
  } else if (diffInHours > 0) {
    return diffInHours === 1 ? "1 hour ago" : `${diffInHours} hours ago`;
  } else if (diffInMinutes > 0) {
    return diffInMinutes === 1
      ? "1 minute ago"
      : `${diffInMinutes} minutes ago`;
  } else {
    return diffInSeconds < 10 ? "Just now" : `${diffInSeconds} seconds ago`;
  }
}

export const styleHashtags = (text: string): string => {
  const regex = /#\w+/g;
  return text
    .split(" ")
    .map((word, index) => {
      if (regex.test(word)) {
        return `<span style="color: #3C8DFF;" key="${index}">${word}</span> `;
      }
      return word + " ";
    })
    .join("");
};

export const getMediaType = (url: string): "image" | "video" => {
  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
  const videoExtensions = [".mp4", ".webm", ".avi", ".mov"];

  if (imageExtensions.some((ext) => url.endsWith(ext))) {
    return "image";
  } else if (videoExtensions.some((ext) => url.endsWith(ext))) {
    return "video";
  } else {
    return "image";
  }
};


export const base64ToFile = async (base64Data: string, fileName: string) => {
  const base64WithoutPrefix = base64Data.split(',')[1];
  const binaryString = atob(base64WithoutPrefix);
  const bytes = new Uint8Array(binaryString.length);

  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return new File([bytes], fileName, { type: 'image/jpeg' });
};

export const fileToArrayBuffer = async (file: File) => {
  return await file.arrayBuffer();
};

