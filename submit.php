<?php
$server = "localhost";
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

// 数据验证
if (strlen($name) > 255) {
    echo 'Name is too long.';
    exit();
}
if (strlen($email) > 30) {
    echo 'Email is too long.';
    exit();
}
if (strlen($phone) > 20) {
    echo 'Phone number is too long.';
    exit();
}

// 使用准备好的语句进行安全的数据库插入操作
$stmt = $conn->prepare("INSERT INTO users (name, email, phone) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $name, $email, $phone);

if ($stmt->execute()) {
    // 返回PDF文件
    header('Content-Type: application/pdf');
    header('Content-Disposition: attachment; filename="tryme.pdf"');
    readfile('tryme.pdf');
} else {
    echo '数据提交失败: ' . $conn->error;
}

$stmt->close();
$conn->close();
?>
