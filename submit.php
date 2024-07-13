<?php
$servername = "localhost";
$username = "id22357213_shirobai";
$password = "Csc@101012";
$dbname = "id22357213_c_details";

// 创建连接
$conn = new mysqli($servername, $username, $password, $dbname);

// 检查连接
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
}

// 获取表单数据
$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];

// 插入数据
$sql = "INSERT INTO users (name, email, phone) VALUES ('$name', '$email', '$phone')";

if ($conn->query($sql) === TRUE) {
    echo "数据提交成功";
    // 下载PDF文件
    header('Content-Type: application/pdf');
    header('Content-Disposition: attachment; filename="salesinfo.pdf"');
    readfile('tryme.pdf');
} else {
    echo "数据提交失败: " . $conn->error;
}

$conn->close();
?>
