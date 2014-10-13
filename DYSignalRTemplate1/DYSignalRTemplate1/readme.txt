slclient 

xmal:
    <Grid x:Name="LayoutRoot" Background="White">
        <ListBox x:Name="lb" HorizontalAlignment="Left" Height="229" Margin="10,34,0,0" VerticalAlignment="Top" Width="380"/>
        <Button x:Name="bt1" Content="发送" HorizontalAlignment="Left" Margin="277,268,0,0" VerticalAlignment="Top" Width="113"/>
        <TextBlock Text="名字:" HorizontalAlignment="Left" Margin="10,10,0,0" TextWrapping="Wrap" VerticalAlignment="Top"/>
        <TextBox HorizontalAlignment="Left" Height="23" Margin="42,6,0,0" TextWrapping="Wrap" x:Name="tb_name" VerticalAlignment="Top" Width="230"/>
        <TextBox HorizontalAlignment="Left" Height="23" Margin="10,267,0,0" TextWrapping="Wrap" x:Name="tb_msg" VerticalAlignment="Top" Width="262"/>
        <Button x:Name="bt_login" Content="登陆" HorizontalAlignment="Left" Margin="277,6,0,0" VerticalAlignment="Top" Width="113" Height="23"/>

    </Grid>

code:
public partial class MainPage : UserControl
    {
        public MainPage()
        {
            InitializeComponent();
            HtmlPage.RegisterScriptableObject("SLDataAccess", this);
            bt1.Click += bt1_Click;
            tb_msg.KeyDown += tb_msg_KeyDown;
        }

        void tb_msg_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.Key == Key.Enter && tb_msg.Text != string.Empty)
            {
                bt1_Click(null, null);
            }
        }

        void bt1_Click(object sender, RoutedEventArgs e)
        {
            HtmlPage.Window.Invoke("sendToServer", tb_name.Text, tb_msg.Text);
            tb_msg.Text = string.Empty;
        }

        [ScriptableMember]
        public void OnConnected()
        {
            lb.Items.Insert(0, "连接完成.......");
        }

        [ScriptableMember]
        public void OnData(string name, string msg)
        {
            lb.Items.Insert(0, name + ":" + msg);
        }

        [ScriptableMember]
        public void OnErr(string msg)
        {
            lb.Items.Insert(0, "error:" + msg);
        }
    }