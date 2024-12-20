
export function timeAgo(createdAt:any) {
    const now:any = new Date();
    const createdAtDate :any = new Date(createdAt);
    const diffInSeconds = Math.floor((now - createdAtDate) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
  
    if (diffInDays > 0) {
      return diffInDays === 1 ? 'Yesterday' : `${diffInDays} days ago`;
    } else if (diffInHours > 0) {
      return diffInHours === 1 ? '1 hour ago' : `${diffInHours} hours ago`;
    } else if (diffInMinutes > 0) {
      return diffInMinutes === 1 ? '1 minute ago' : `${diffInMinutes} minutes ago`;
    } else {
      return diffInSeconds < 10 ? 'Just now' : `${diffInSeconds} seconds ago`;
    }
  }
  