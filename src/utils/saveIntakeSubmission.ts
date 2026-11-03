import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

/** Private bucket (all public access blocked); the site may only write to submissions/. */
const BUCKET = "aipi-data-intake-445849135780";

let cachedClient: S3Client | undefined;

function getClient(): S3Client {
  cachedClient ??= new S3Client({
    region: process.env.AWS_REGION ?? "us-east-1",
  });
  return cachedClient;
}

function slugify(value: string): string {
  return (
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40) || "company"
  );
}

/**
 * Stores a data intake submission as JSON and returns its S3 URI. Throws if
 * S3 rejects the write.
 */
export async function saveIntakeSubmission(submission: {
  id: string;
  submittedAt: string;
  companyName: string;
}): Promise<string> {
  const timestamp = submission.submittedAt.replace(/[:.]/g, "-");
  const key = `submissions/${timestamp}_${slugify(submission.companyName)}_${submission.id}.json`;

  await getClient().send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: JSON.stringify(submission, null, 2),
      ContentType: "application/json; charset=utf-8",
    }),
  );

  return `s3://${BUCKET}/${key}`;
}
