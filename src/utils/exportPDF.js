
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const exportPDF = (childName, activities) => {
  const doc = new jsPDF();

  const completed = activities.filter(
    (activity) => activity.status === "Completed"
  ).length;

  const inProgress = activities.filter(
    (activity) => activity.status === "In Progress"
  ).length;

  const notStarted = activities.filter(
    (activity) => activity.status === "Not Started"
  ).length;

  const averageProgress =
    activities.length > 0
      ? (
          activities.reduce(
            (total, activity) =>
              total + Number(activity.progress || 0),
            0
          ) / activities.length
        ).toFixed(1)
      : 0;

  // Report heading
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("Learning Progress Report", 14, 20);

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Child Name: ${childName}`, 14, 32);
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 40);

  // Summary
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Progress Summary", 14, 53);

  autoTable(doc, {
    startY: 58,
    head: [["Total Activities", "Completed", "In Progress", "Not Started", "Average Progress"]],
    body: [[
      activities.length,
      completed,
      inProgress,
      notStarted,
      `${averageProgress}%`,
    ]],
    styles: { halign: "center", fontSize: 9 },
    theme: "grid",
  });

  // Activity details
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Activity Details", 14, doc.lastAutoTable.finalY + 15);

  const tableRows = activities.map((activity) => [
    activity.title || "-",
    activity.category || "-",
    activity.scheduledDate || "-",
    activity.status || "-",
    `${activity.progress || 0}%`,
  ]);

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 20,
    head: [[
      "Activity",
      "Category",
      "Date",
      "Status",
      "Progress",
    ]],
    body: tableRows,
    theme: "striped",
    styles: {
      fontSize: 9,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [41, 98, 160],
    },
  });

  // Download PDF
  const safeName = childName.replace(/[^a-z0-9]/gi, "_");
  doc.save(`${safeName}_Progress_Report.pdf`);
};

export default exportPDF;
