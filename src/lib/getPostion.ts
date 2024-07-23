export async function getPosition(): Promise<{ lat: number; lng: number } | null> {
  if (!navigator.geolocation) {
    console.log("位置情報を取得できません");
  }

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const point = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        console.log({point: point});
        resolve(point);
      },

      (error) => {
        console.log(error)
        resolve(null);
      }
    );
  });
}