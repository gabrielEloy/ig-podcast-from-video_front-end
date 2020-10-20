import axios from "axios";
import { ThumbnailProps } from "../components/Thumnail";

const baseUrl = "http://localhost:3000";

export async function getThumbnail(url: string): Promise<ThumbnailProps> {
  const {
    data: { videoInfo },
  } = await axios.post(`${baseUrl}/video-info`, {
    url,
  });

  return videoInfo;
}
export async function donwloadAudio(
  url: string
): Promise<{ Location: string }> {
  const { data } = await axios.post(`${baseUrl}/download-video`, {
    url,
  });

  return data;
}

export async function queueAudioDownload(url: string): Promise<any> {
  const { data } = await axios.post(`${baseUrl}/queue-download-video`, { url });

  return data;
}
